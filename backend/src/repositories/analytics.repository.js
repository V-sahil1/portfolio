import { fn, col, literal, Op } from 'sequelize';
import { sequelize } from '../config/database.js';
import { VisitorSession, VisitorEvent, Contact, Visitor } from '../models/index.js';
import { EVENT_TYPES } from '../constants/index.js';

/** Bounce threshold: a session shorter than this many seconds counts as a bounce. */
const BOUNCE_THRESHOLD_SECONDS = 10;

/**
 * Analytics repository — all aggregate/reporting queries live here so services
 * stay thin. Every method returns plain JS values ready for the response.
 */
class AnalyticsRepository {
  /* ------------------------------------------------------------------ *
   * Counts
   * ------------------------------------------------------------------ */

  /**
   * Total visits (one row per session).
   * @param {object} [where]
   */
  totalVisitors(where = {}) {
    return VisitorSession.count({ where });
  }

  /**
   * Unique visitors, approximated by distinct IP address.
   * @param {object} [where]
   */
  uniqueVisitors(where = {}) {
    return VisitorSession.count({ where, distinct: true, col: 'ipAddress' });
  }

  /**
   * Session count within a date range on createdAt.
   * @param {Date} start
   * @param {Date} [end]
   */
  visitorsBetween(start, end = new Date()) {
    return VisitorSession.count({
      where: { createdAt: { [Op.between]: [start, end] } },
    });
  }

  /**
   * Count events of a given action type.
   * @param {string} action - one of EVENT_TYPES
   */
  eventCount(action) {
    return VisitorEvent.count({ where: { action } });
  }

  /** Total contact-form submissions. */
  contactRequests() {
    return Contact.count();
  }

  /* ------------------------------------------------------------------ *
   * Session quality metrics
   * ------------------------------------------------------------------ */

  /**
   * Average session duration in seconds (0 when there are no sessions).
   * @returns {Promise<number>}
   */
  async averageSessionDuration() {
    const avg = await VisitorSession.findOne({
      attributes: [[fn('AVG', col('visitDuration')), 'avg']],
      raw: true,
    });
    return Math.round(Number(avg?.avg || 0));
  }

  /**
   * Bounce rate (%) — share of sessions shorter than the bounce threshold.
   * @returns {Promise<number>}
   */
  async bounceRate() {
    const total = await VisitorSession.count();
    if (!total) return 0;
    const bounced = await VisitorSession.count({
      where: { visitDuration: { [Op.lt]: BOUNCE_THRESHOLD_SECONDS } },
    });
    return Math.round((bounced / total) * 10000) / 100; // 2 decimal places
  }

  /* ------------------------------------------------------------------ *
   * "Top N" breakdowns (generic helper + specific wrappers)
   * ------------------------------------------------------------------ */

  /**
   * Generic "group by a column and count, ordered desc" query.
   * @param {import('sequelize').ModelStatic<any>} model
   * @param {string} column
   * @param {number} [limit=5]
   * @returns {Promise<Array<{ key: string, count: number }>>}
   */
  async topBy(model, column, limit = 5) {
    const rows = await model.findAll({
      attributes: [
        [col(column), 'key'],
        [fn('COUNT', col('id')), 'count'],
      ],
      where: { [column]: { [Op.ne]: null } },
      group: [col(column)],
      order: [[literal('count'), 'DESC']],
      limit,
      raw: true,
    });
    return rows.map((r) => ({ key: r.key, count: Number(r.count) }));
  }

  /** Top companies (from identified visitors). */
  topCompanies(limit = 5) {
    return this.topBy(Visitor, 'company', limit);
  }

  /** Top countries (from sessions). */
  topCountries(limit = 5) {
    return this.topBy(VisitorSession, 'country', limit);
  }

  /** Top browsers (from sessions). */
  topBrowsers(limit = 5) {
    return this.topBy(VisitorSession, 'browser', limit);
  }

  /** Top device types (from sessions). */
  topDevices(limit = 5) {
    return this.topBy(VisitorSession, 'deviceType', limit);
  }

  /** Top operating systems (from sessions). */
  topOperatingSystems(limit = 5) {
    return this.topBy(VisitorSession, 'operatingSystem', limit);
  }

  /** Top landing pages (from sessions). */
  topLandingPages(limit = 5) {
    return this.topBy(VisitorSession, 'landingPage', limit);
  }

  /** Top referrers (from sessions). */
  topReferrers(limit = 5) {
    return this.topBy(VisitorSession, 'referrer', limit);
  }

  /** Top cities (from sessions). */
  topCities(limit = 5) {
    return this.topBy(VisitorSession, 'city', limit);
  }

  /* ------------------------------------------------------------------ *
   * Time series
   * ------------------------------------------------------------------ */

  /**
   * Visitors (sessions) grouped per day for the last N days.
   * @param {number} [days=30]
   * @returns {Promise<Array<{ date: string, count: number }>>}
   */
  async visitorsPerDay(days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const rows = await VisitorSession.findAll({
      attributes: [
        [literal(`DATE_TRUNC('day', "createdAt")`), 'date'],
        [fn('COUNT', col('id')), 'count'],
      ],
      where: { createdAt: { [Op.gte]: since } },
      group: [literal(`DATE_TRUNC('day', "createdAt")`)],
      order: [[literal('date'), 'ASC']],
      raw: true,
    });
    return rows.map((r) => ({ date: r.date, count: Number(r.count) }));
  }

  /**
   * Visitors (sessions) grouped per month for the last N months.
   * @param {number} [months=12]
   * @returns {Promise<Array<{ month: string, count: number }>>}
   */
  async visitorsPerMonth(months = 12) {
    const since = new Date();
    since.setMonth(since.getMonth() - months);
    const rows = await VisitorSession.findAll({
      attributes: [
        [literal(`DATE_TRUNC('month', "createdAt")`), 'month'],
        [fn('COUNT', col('id')), 'count'],
      ],
      where: { createdAt: { [Op.gte]: since } },
      group: [literal(`DATE_TRUNC('month', "createdAt")`)],
      order: [[literal('month'), 'ASC']],
      raw: true,
    });
    return rows.map((r) => ({ month: r.month, count: Number(r.count) }));
  }

  /* ------------------------------------------------------------------ *
   * Behavioural metrics
   * ------------------------------------------------------------------ */

  /**
   * Most visited project, derived from OPEN_PROJECT / VIEW_PROJECT event
   * metadata (`metadata->>'projectName'`).
   * @param {number} [limit=5]
   * @returns {Promise<Array<{ project: string, count: number }>>}
   */
  async mostVisitedProjects(limit = 5) {
    const rows = await VisitorEvent.findAll({
      attributes: [
        [literal(`metadata->>'projectName'`), 'project'],
        [fn('COUNT', col('id')), 'count'],
      ],
      where: {
        action: { [Op.in]: [EVENT_TYPES.OPEN_PROJECT, EVENT_TYPES.VIEW_PROJECT] },
        [Op.and]: literal(`metadata->>'projectName' IS NOT NULL`),
      },
      group: [literal(`metadata->>'projectName'`)],
      order: [[literal('count'), 'DESC']],
      limit,
      raw: true,
    });
    return rows.map((r) => ({ project: r.project, count: Number(r.count) }));
  }

  /**
   * Returning visitors — identified visitors with more than one session.
   * @returns {Promise<number>}
   */
  async returningVisitors() {
    const rows = await VisitorSession.findAll({
      attributes: ['visitorId', [fn('COUNT', col('id')), 'sessions']],
      where: { visitorId: { [Op.ne]: null } },
      group: ['visitorId'],
      having: literal('COUNT("id") > 1'),
      raw: true,
    });
    return rows.length;
  }
}

export const analyticsRepository = new AnalyticsRepository();

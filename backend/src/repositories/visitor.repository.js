import { Op } from 'sequelize';
import { BaseRepository } from './base.repository.js';
import { Visitor, VisitorSession, VisitorEvent, Contact } from '../models/index.js';

/**
 * Data access for visitors, including the paginated/searchable listing and the
 * full visitor profile (sessions + events + contacts).
 */
class VisitorRepository extends BaseRepository {
  constructor() {
    super(Visitor);
  }

  /**
   * Paginated, filterable, sortable list of visitors.
   * @param {object} params
   * @param {number} params.limit
   * @param {number} params.offset
   * @param {string} [params.search] - matches name/company/email/designation
   * @param {object} [params.filters] - { company, designation, country, startDate, endDate }
   * @param {string} [params.sortBy]
   * @param {string} [params.order]
   * @returns {Promise<{ rows: Visitor[], count: number }>}
   */
  async list({ limit, offset, search, filters = {}, sortBy = 'createdAt', order = 'DESC' }) {
    const where = {};
    const include = [];

    // Free-text search across the main identifying fields.
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { company: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { designation: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (filters.company) where.company = { [Op.iLike]: `%${filters.company}%` };
    if (filters.designation) where.designation = { [Op.iLike]: `%${filters.designation}%` };

    // Date range on createdAt.
    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt[Op.gte] = new Date(filters.startDate);
      if (filters.endDate) where.createdAt[Op.lte] = new Date(filters.endDate);
    }

    // Country lives on the session; filter via an inner join when requested.
    if (filters.country) {
      include.push({
        model: VisitorSession,
        as: 'sessions',
        attributes: [],
        where: { country: { [Op.iLike]: `%${filters.country}%` } },
        required: true,
      });
    }

    return this.model.findAndCountAll({
      where,
      include,
      order: [[sortBy, order.toUpperCase()]],
      limit,
      offset,
      distinct: true, // correct count when joining sessions
      subQuery: false,
    });
  }

  /**
   * Full visitor profile: the visitor plus their sessions, events and contacts.
   * @param {string} id - visitor UUID
   * @returns {Promise<Visitor|null>}
   */
  findProfile(id) {
    return this.model.findByPk(id, {
      include: [
        { model: VisitorSession, as: 'sessions', separate: true, order: [['createdAt', 'DESC']] },
        { model: VisitorEvent, as: 'events', separate: true, order: [['createdAt', 'DESC']] },
        { model: Contact, as: 'contacts', separate: true, order: [['createdAt', 'DESC']] },
      ],
    });
  }
}

export const visitorRepository = new VisitorRepository();

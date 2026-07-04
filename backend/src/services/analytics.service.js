import { analyticsRepository } from '../repositories/analytics.repository.js';
import { visitorRepository } from '../repositories/visitor.repository.js';
import { cacheService } from './cache.service.js';
import { getPagination, buildPaginationMeta } from '../utils/pagination.js';
import { CACHE_KEYS } from '../constants/index.js';

class AnalyticsService {
  /**
   * Fetch the standalone analytics report (time series + breakdowns + derived
   * metrics). Cached under a range-scoped key.
   * @param {object} query - { limit }
   * @returns {Promise<object>}
   */
  async getReport(query = {}) {
    const limit = query.limit || 5;
    return cacheService.remember(CACHE_KEYS.ANALYTICS('report', String(limit)), async () => {
      const [
        visitorsPerDay,
        visitorsPerMonth,
        resumeDownloads,
        topCompanies,
        mostVisitedProjects,
        returningVisitors,
        averageSessionDuration,
        topBrowsers,
        topDevices,
        topOperatingSystems,
        topCountries,
        topCities,
      ] = await Promise.all([
        analyticsRepository.visitorsPerDay(30),
        analyticsRepository.visitorsPerMonth(12),
        analyticsRepository.eventCount('DOWNLOAD_RESUME'),
        analyticsRepository.topCompanies(limit),
        analyticsRepository.mostVisitedProjects(limit),
        analyticsRepository.returningVisitors(),
        analyticsRepository.averageSessionDuration(),
        analyticsRepository.topBrowsers(limit),
        analyticsRepository.topDevices(limit),
        analyticsRepository.topOperatingSystems(limit),
        analyticsRepository.topCountries(limit),
        analyticsRepository.topCities(limit),
      ]);

      return {
        timeSeries: { visitorsPerDay, visitorsPerMonth },
        engagement: { resumeDownloads, returningVisitors, averageSessionDuration },
        breakdowns: {
          topCompanies,
          mostVisitedProjects,
          topBrowsers,
          topDevices,
          topOperatingSystems,
          topCountries,
          topCities,
        },
        // Convenience singletons (most common of each dimension).
        mostCommon: {
          browser: topBrowsers[0]?.key ?? null,
          device: topDevices[0]?.key ?? null,
          operatingSystem: topOperatingSystems[0]?.key ?? null,
          country: topCountries[0]?.key ?? null,
          city: topCities[0]?.key ?? null,
        },
        generatedAt: new Date().toISOString(),
      };
    });
  }

  /**
   * Search visitors by company / designation / name / country / date.
   * @param {object} query
   * @returns {Promise<{ items: object[], meta: object }>}
   */
  async search(query) {
    const { page, limit, offset } = getPagination(query);
    const { rows, count } = await visitorRepository.list({
      limit,
      offset,
      search: query.name, // free-text name search
      filters: {
        company: query.company,
        designation: query.designation,
        country: query.country,
        startDate: query.date,
        endDate: query.date
          ? new Date(new Date(query.date).getTime() + 24 * 60 * 60 * 1000)
          : undefined,
      },
      sortBy: 'createdAt',
      order: 'DESC',
    });
    return { items: rows, meta: buildPaginationMeta(count, page, limit) };
  }
}

export const analyticsService = new AnalyticsService();

import { analyticsRepository } from '../repositories/analytics.repository.js';
import { cacheService } from './cache.service.js';
import { CACHE_KEYS, EVENT_TYPES } from '../constants/index.js';
import { startOfToday, startOfWeek, startOfMonth } from '../helpers/date.helper.js';

class DashboardService {
  /**
   * Aggregate every headline dashboard metric in one call. The whole payload
   * is cached (short TTL) because it fans out into ~18 queries.
   * @returns {Promise<object>} dashboard payload
   */
  async getDashboard() {
    return cacheService.remember(CACHE_KEYS.DASHBOARD, async () => {
      // Run all independent aggregate queries in parallel.
      const [
        totalVisitors,
        uniqueVisitors,
        todayVisitors,
        weekVisitors,
        monthVisitors,
        resumeDownloads,
        githubClicks,
        linkedinClicks,
        contactRequests,
        averageSessionTime,
        bounceRate,
        topCompanies,
        topCountries,
        topBrowsers,
        topDevices,
        topLandingPages,
        topReferrers,
        returningVisitors,
      ] = await Promise.all([
        analyticsRepository.totalVisitors(),
        analyticsRepository.uniqueVisitors(),
        analyticsRepository.visitorsBetween(startOfToday()),
        analyticsRepository.visitorsBetween(startOfWeek()),
        analyticsRepository.visitorsBetween(startOfMonth()),
        analyticsRepository.eventCount(EVENT_TYPES.DOWNLOAD_RESUME),
        analyticsRepository.eventCount(EVENT_TYPES.CLICK_GITHUB),
        analyticsRepository.eventCount(EVENT_TYPES.CLICK_LINKEDIN),
        analyticsRepository.contactRequests(),
        analyticsRepository.averageSessionDuration(),
        analyticsRepository.bounceRate(),
        analyticsRepository.topCompanies(),
        analyticsRepository.topCountries(),
        analyticsRepository.topBrowsers(),
        analyticsRepository.topDevices(),
        analyticsRepository.topLandingPages(),
        analyticsRepository.topReferrers(),
        analyticsRepository.returningVisitors(),
      ]);

      return {
        totals: {
          totalVisitors,
          uniqueVisitors,
          todayVisitors,
          weekVisitors,
          monthVisitors,
          returningVisitors,
          contactRequests,
        },
        engagement: {
          resumeDownloads,
          githubClicks,
          linkedinClicks,
          averageSessionTime, // seconds
          bounceRate, // percent
        },
        breakdowns: {
          topCompanies,
          topCountries,
          topBrowsers,
          topDevices,
          topLandingPages,
          topReferrers,
        },
        generatedAt: new Date().toISOString(),
      };
    });
  }
}

export const dashboardService = new DashboardService();

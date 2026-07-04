import { visitorRepository } from '../repositories/visitor.repository.js';
import { cacheService } from './cache.service.js';
import { enqueueRecruiterNotification } from '../queues/email.queue.js';
import { getPagination, buildPaginationMeta } from '../utils/pagination.js';
import { CACHE_KEYS, CACHE_PREFIX } from '../constants/index.js';
import { ApiError } from '../utils/ApiError.js';
import { MESSAGES } from '../constants/index.js';

class VisitorService {
  /**
   * Create/record a visitor. If the visitor supplied identifying details
   * (recruiter filling the form), enqueue a notification email.
   * @param {object} data
   * @returns {Promise<object>} created visitor
   */
  async create(data) {
    const visitor = await visitorRepository.create(data);

    // "Whenever a recruiter fills details, send an email."
    const hasDetails = Boolean(data.company || data.email || data.name);
    if (hasDetails) {
      await enqueueRecruiterNotification(visitor.toJSON());
    }

    // New visitor affects analytics → invalidate cached aggregates.
    await cacheService.delByPrefix(CACHE_PREFIX.ANALYTICS);
    return visitor;
  }

  /**
   * Paginated/filterable/sortable visitor listing.
   * @param {object} query - req.query
   * @returns {Promise<{ items: object[], meta: object }>}
   */
  async list(query) {
    const { page, limit, offset } = getPagination(query);
    const { rows, count } = await visitorRepository.list({
      limit,
      offset,
      search: query.search,
      filters: {
        company: query.company,
        designation: query.designation,
        country: query.country,
        startDate: query.startDate,
        endDate: query.endDate,
      },
      sortBy: query.sortBy || 'createdAt',
      order: query.order || 'DESC',
    });

    return { items: rows, meta: buildPaginationMeta(count, page, limit) };
  }

  /**
   * Full visitor profile (sessions + events + contact history), cached.
   * @param {string} id
   * @returns {Promise<object>}
   */
  async getProfile(id) {
    const cacheKey = CACHE_KEYS.VISITOR(id);
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    const visitor = await visitorRepository.findProfile(id);
    if (!visitor) throw ApiError.notFound(MESSAGES.NOT_FOUND);

    const payload = visitor.toJSON();
    await cacheService.set(cacheKey, payload);
    return payload;
  }
}

export const visitorService = new VisitorService();

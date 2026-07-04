import { eventRepository } from '../repositories/event.repository.js';
import { cacheService } from './cache.service.js';
import { enqueueResumeDownloadNotification } from '../queues/email.queue.js';
import { EVENT_TYPES, CACHE_PREFIX } from '../constants/index.js';

class EventService {
  /**
   * Track a visitor event. A résumé download additionally enqueues an email
   * notification to the portfolio owner.
   * @param {object} data - validated event payload
   * @returns {Promise<object>} created event
   */
  async create(data) {
    const event = await eventRepository.create({
      visitorId: data.visitorId || null,
      sessionId: data.sessionId || null,
      page: data.page || null,
      action: data.action,
      metadata: data.metadata || {},
    });

    // Notify on résumé downloads.
    if (data.action === EVENT_TYPES.DOWNLOAD_RESUME) {
      await enqueueResumeDownloadNotification({
        visitorId: data.visitorId || null,
        sessionId: data.sessionId || null,
        page: data.page || null,
        metadata: data.metadata || {},
        occurredAt: event.createdAt,
      });
    }

    // Events feed several analytics metrics → invalidate cache.
    await cacheService.delByPrefix(CACHE_PREFIX.ANALYTICS);
    return event;
  }
}

export const eventService = new EventService();

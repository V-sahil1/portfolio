import { config } from '../config/env.js';

/**
 * Format a Date as "04 Jul 2026 08:15 PM" in the configured display timezone.
 * Used for the "Time" line of the WhatsApp notification.
 * @param {Date} [date=new Date()]
 * @returns {string}
 */
export const formatDateTime = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: config.displayTimezone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(date);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
  const dayPeriod = get('dayPeriod').toUpperCase();

  // "04 Jul 2026 08:15 PM"
  return `${get('day')} ${get('month')} ${get('year')} ${get('hour')}:${get('minute')} ${dayPeriod}`;
};

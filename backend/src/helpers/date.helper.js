/**
 * Date-range helpers for analytics windows. All returned dates are absolute
 * so they can be passed straight into Sequelize where-clauses.
 */

/** Start of the current day (00:00:00, server local time). */
export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Start of the current ISO week (Monday 00:00:00). */
export const startOfWeek = () => {
  const d = startOfToday();
  const day = (d.getDay() + 6) % 7; // 0 = Monday
  d.setDate(d.getDate() - day);
  return d;
};

/** Start of the current month (1st, 00:00:00). */
export const startOfMonth = () => {
  const d = startOfToday();
  d.setDate(1);
  return d;
};

/** Start of the current year (Jan 1, 00:00:00). */
export const startOfYear = () => {
  const d = startOfToday();
  d.setMonth(0, 1);
  return d;
};

/**
 * Resolve a named range keyword to a { start, end } window.
 * @param {'today'|'week'|'month'|'year'|'all'} range
 * @returns {{ start: Date|null, end: Date }}
 */
export const resolveRange = (range = 'all') => {
  const end = new Date();
  switch (range) {
    case 'today':
      return { start: startOfToday(), end };
    case 'week':
      return { start: startOfWeek(), end };
    case 'month':
      return { start: startOfMonth(), end };
    case 'year':
      return { start: startOfYear(), end };
    default:
      return { start: null, end };
  }
};

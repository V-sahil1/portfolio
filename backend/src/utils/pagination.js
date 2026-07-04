/**
 * Normalise pagination query parameters into safe Sequelize limit/offset.
 * @param {object} query - typically req.query
 * @param {number} [query.page=1]
 * @param {number} [query.limit=10]
 * @returns {{ page: number, limit: number, offset: number }}
 */
export const getPagination = ({ page = 1, limit = 10 } = {}) => {
  const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 10));
  return {
    page: safePage,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
  };
};

/**
 * Build a pagination metadata object for the response envelope.
 * @param {number} count - total matching rows
 * @param {number} page - current page
 * @param {number} limit - page size
 * @returns {{ total: number, page: number, limit: number, totalPages: number, hasNextPage: boolean, hasPrevPage: boolean }}
 */
export const buildPaginationMeta = (count, page, limit) => {
  const totalPages = Math.ceil(count / limit) || 1;
  return {
    total: count,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

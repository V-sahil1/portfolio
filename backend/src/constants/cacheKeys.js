/**
 * Redis cache key builders + TTLs.
 * Using builder functions keeps key formats consistent and greppable.
 */
export const CACHE_KEYS = Object.freeze({
  DASHBOARD: 'analytics:dashboard',
  /** @param {string} name analytics metric name @param {string} range range key */
  ANALYTICS: (name, range = 'all') => `analytics:${name}:${range}`,
  /** @param {string} id visitor UUID */
  VISITOR: (id) => `visitor:${id}`,
});

/** Prefix used to bulk-invalidate every analytics cache entry on writes. */
export const CACHE_PREFIX = Object.freeze({
  ANALYTICS: 'analytics:',
  VISITOR: 'visitor:',
});

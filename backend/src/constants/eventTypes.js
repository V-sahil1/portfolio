/**
 * All trackable visitor events. Kept as a frozen map so the values can be
 * referenced symbolically (EVENT_TYPES.CLICK_GITHUB) and validated against a Set.
 */
export const EVENT_TYPES = Object.freeze({
  VIEW_HOME: 'VIEW_HOME',
  VIEW_ABOUT: 'VIEW_ABOUT',
  VIEW_PROJECT: 'VIEW_PROJECT',
  VIEW_EXPERIENCE: 'VIEW_EXPERIENCE',
  VIEW_CONTACT: 'VIEW_CONTACT',
  VIEW_SKILLS: 'VIEW_SKILLS',
  CLICK_GITHUB: 'CLICK_GITHUB',
  CLICK_LINKEDIN: 'CLICK_LINKEDIN',
  CLICK_RESUME: 'CLICK_RESUME',
  DOWNLOAD_RESUME: 'DOWNLOAD_RESUME',
  CONTACT_FORM: 'CONTACT_FORM',
  SEND_EMAIL: 'SEND_EMAIL',
  OPEN_PROJECT: 'OPEN_PROJECT',
  SCROLL_50: 'SCROLL_50',
  SCROLL_100: 'SCROLL_100',
});

/** Array form — used by validators and Sequelize ENUM definitions. */
export const EVENT_TYPE_VALUES = Object.values(EVENT_TYPES);

/** Fast membership lookup for validation. */
export const EVENT_TYPE_SET = new Set(EVENT_TYPE_VALUES);

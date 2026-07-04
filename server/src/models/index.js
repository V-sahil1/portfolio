import { sequelize } from '../config/database.js';
import { Contact } from './contact.model.js';

/**
 * Model registry. This project has a single model, but the barrel keeps the
 * import surface consistent and gives one place to declare associations later.
 */
export const db = { sequelize, Contact };

export { sequelize, Contact };

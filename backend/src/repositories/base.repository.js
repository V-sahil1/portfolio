/**
 * Generic data-access wrapper around a Sequelize model. Concrete repositories
 * extend this to inherit standard CRUD, keeping query logic out of services.
 */
export class BaseRepository {
  /** @param {import('sequelize').ModelStatic<any>} model */
  constructor(model) {
    this.model = model;
  }

  /**
   * Create a single row.
   * @param {object} data
   * @param {object} [options] - Sequelize options (e.g. { transaction })
   */
  create(data, options = {}) {
    return this.model.create(data, options);
  }

  /**
   * Insert many rows at once.
   * @param {object[]} rows
   * @param {object} [options]
   */
  bulkCreate(rows, options = {}) {
    return this.model.bulkCreate(rows, options);
  }

  /**
   * Find a row by primary key.
   * @param {string|number} id
   * @param {object} [options]
   */
  findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  /**
   * Find the first row matching a where clause.
   * @param {object} where
   * @param {object} [options]
   */
  findOne(where, options = {}) {
    return this.model.findOne({ where, ...options });
  }

  /**
   * Find all rows matching options.
   * @param {object} [options]
   */
  findAll(options = {}) {
    return this.model.findAll(options);
  }

  /**
   * Find rows + total count (for pagination).
   * @param {object} [options]
   * @returns {Promise<{ rows: any[], count: number }>}
   */
  findAndCountAll(options = {}) {
    return this.model.findAndCountAll(options);
  }

  /**
   * Update rows matching a where clause.
   * @param {object} values
   * @param {object} where
   * @param {object} [options]
   */
  update(values, where, options = {}) {
    return this.model.update(values, { where, ...options });
  }

  /**
   * Delete rows matching a where clause.
   * @param {object} where
   * @param {object} [options]
   */
  destroy(where, options = {}) {
    return this.model.destroy({ where, ...options });
  }

  /**
   * Count rows matching options.
   * @param {object} [options]
   */
  count(options = {}) {
    return this.model.count(options);
  }
}

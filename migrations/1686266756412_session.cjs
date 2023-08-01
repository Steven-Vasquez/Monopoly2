/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("session", {
      sid: {
        type: "varchar(255)",
        notNull: true,
        primaryKey: true,
      },
      sess: {
        type: "json",
        notNull: true,
      },
      expire: {
        type: "timestamp",
        notNull: true,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("session");
  };
  
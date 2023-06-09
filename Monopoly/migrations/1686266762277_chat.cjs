/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("chat", {
      game_id: {
        type: "integer",
        notNull: true,
      },
      sender_id: {
        type: "integer",
        notNull: true,
      },
      message: {
        type: "varchar(255)",
        notNull: true,
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("chat");
  };
  
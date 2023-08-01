/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("inventory", {
      user_id: {
        type: "integer",
        notNull: true,
      },
      game_id: {
        type: "integer",
        notNull: true,
      },
      balance: {
        type: "integer",
        notNull: true,
        default: 1500,
      },
      jail_turns: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      jail_free_card: {
        type: "integer",
        notNull: true,
        default: 0,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("inventory");
  };
  
/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("games", {
      id: "id",
      joinable: {
        type: "boolean",
        default: true,
      },
      completed: {
        type: "boolean",
        default: false,
      },
      game_title: {
        type: "varchar(255)",
        notNull: true,
        default: "Untitled Game",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      free_parking_payout: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      turn_number: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      player_count: {
        type: "integer",
        notNull: true,
        default: 1,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("games");
  };
  
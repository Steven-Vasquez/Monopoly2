/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("game_users", {
      game_id: {
        type: "integer",
        notNull: true,
      },
      user_id: {
        type: "integer",
        notNull: true,
      },
      current_player: {
        type: "boolean",
        default: false,
      },
      play_order: {
        type: "integer",
        notNull: true,
      },
      board_position: {
        type: "integer",
        notNull: true,
        default: 1,
      },
      dice_doubles_count: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      alive: {
        type: "boolean",
        notNull: true,
        default: true,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("game_users");
  };
  
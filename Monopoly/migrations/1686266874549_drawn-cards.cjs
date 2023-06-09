/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("drawn_cards", {
      game_id: {
        type: "integer",
        notNull: true,
      },
      user_id: {
        type: "integer",
        notNull: true,
      },
      drawn_at: {
        type: "timestamp",
        notNull: true,
      },
      card_id: {
        type: "integer",
        notNull: true,
      },
      deck_id: {
        type: "integer",
        notNull: true,
      },
      turn_number: {
        type: "integer",
        notNull: true,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("drawn_cards");
  };
  
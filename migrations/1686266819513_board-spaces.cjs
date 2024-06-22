/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("board_spaces", {
      game_id: {
        type: "integer",
        notNull: true,
      },
      board_position: {
        type: "integer",
        notNull: true,
      },
      space_type: {
        type: "varchar(255)",
        notNull: true,
      },
      property_id: {
        type: "integer",
      }
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("board_spaces");
  };
  
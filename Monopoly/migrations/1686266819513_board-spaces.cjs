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
      space_name: {
        type: "varchar(255)",
        notNull: true,
      },
      property_owned: {
        type: "boolean",
        default: false,
      },
      property_owner: {
        type: "integer",
        notNull: true,
        default: -1,
      },
      space_type: {
        type: "varchar(255)",
        notNull: true,
      },
      house_count: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      mortgaged: {
        type: "boolean",
        default: false,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("board_spaces");
  };
  
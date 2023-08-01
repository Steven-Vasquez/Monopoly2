/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("property_inventory", {
      user_id: {
        type: "integer",
        notNull: true,
      },
      game_id: {
        type: "integer",
        notNull: true,
      },
      railroads_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      utilities_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      browns_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      light_blues_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      magentas_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      oranges_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      reds_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      yellows_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      greens_owned: {
        type: "integer",
        notNull: true,
        default: 0,
      },
      dark_blues_owned: {
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
    pgm.dropTable("property_inventory");
  };
  
/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("property_info", {
      board_position: {
        type: "integer",
        notNull: true,
      },
      property_name: {
        type: "varchar(255)",
        notNull: true,
      },
      property_color: {
        type: "varchar(255)",
        notNull: true,
      },
      property_cost: {
        type: "integer",
        notNull: true,
      },
      mortgage_payout: {
        type: "integer",
        notNull: true,
      },
      unmortgage_cost: {
        type: "integer",
        notNull: true,
      },
      payout_base: {
        type: "integer",
        notNull: true,
      },
      house_cost_1: {
        type: "integer",
        notNull: true,
      },
      house_cost_2: {
        type: "integer",
        notNull: true,
      },
      house_cost_3: {
        type: "integer",
        notNull: true,
      },
      house_cost_4: {
        type: "integer",
        notNull: true,
      },
      hotel_cost: {
        type: "integer",
        notNull: true,
      },
      payout_house_1: {
        type: "integer",
        notNull: true,
      },
      payout_house_2: {
        type: "integer",
        notNull: true,
      },
      payout_house_3: {
        type: "integer",
        notNull: true,
      },
      payout_house_4: {
        type: "integer",
        notNull: true,
      },
      payout_hotel: {
        type: "integer",
        notNull: true,
      },
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("property_info");
  };  
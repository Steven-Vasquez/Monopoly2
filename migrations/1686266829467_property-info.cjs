/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
    pgm.createTable("property_info", {
      property_id: {
        type: "integer",
        notNull: true,
      },
      game_id: {
        type: "integer",
        notNull: true,
      },
      property_name: {
        type: "varchar(255)",
        notNull: true,
      },
      property_color: {
        type: "varchar(255)",
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
      },
      house_count: {
        type: "integer",
        default: 0,
      },
      house_hotel_cost: {
        type: "integer",
      },
      payout_house_1: {
        type: "integer",
      },
      payout_house_2: {
        type: "integer",
      },
      payout_house_3: {
        type: "integer",
      },
      payout_house_4: {
        type: "integer",
      },
      payout_hotel: {
        type: "integer",
      },
      mortgaged: {
        type: "boolean",
      },
      property_owned: {
        type: "boolean",
      },
      property_owner: {
        type: "integer",
      },
      property_type: {
        type: "varchar(255)",
        notNull: true,
      }
    });
  };
  
  /**
   * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
   */
  exports.down = (pgm) => {
    pgm.dropTable("property_info");
  };  
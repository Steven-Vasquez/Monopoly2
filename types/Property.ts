import { PropertyColor } from "../types/PropertyColor.ts";

interface Property {
    property_id: number,
    game_id: number,
    property_type: "color" | "railroad" | "utility",
    property_name: string,
    property_color?: PropertyColor,
    property_cost: number,
    mortgage_payout: number,
    unmortgage_cost: number,
    payout_base?: number,
    house_count?: number,
    house_hotel_cost?: number,
    payout_house_1?: number,
    payout_house_2?: number,
    payout_house_3?: number,
    payout_house_4?: number,
    payout_hotel?: number,
    owned?: boolean,
    owner?: number,
    mortgaged?: boolean,
}

export default Property;
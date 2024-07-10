import { SpaceType } from "../types/SpaceType.ts";

interface BoardSpace {
    board_position: number,
    space_type: SpaceType,
    property_id?: number
}

export default BoardSpace;
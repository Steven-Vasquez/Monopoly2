interface BoardSpace {
    board_position: number,
    space_type: "property" | "income_tax" | "community_chest" | "chance" | "luxury_tax" | "go" | "jail" | "free_parking" | "go_to_jail",
    property_id?: number
}
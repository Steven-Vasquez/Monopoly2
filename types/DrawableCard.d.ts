interface DrawableCard {
    type: "chance" | "community_chest"
    deck_id: number,
    game_id: number,
    card_id: number,
    text: string,
    action_type: string,
    action_data?: number 
}
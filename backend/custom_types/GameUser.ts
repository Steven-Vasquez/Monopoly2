interface GameUser {
    game_id: number;
    user_id: number;
    current_player: boolean;
    play_order: number;
    board_position: number;
    dice_doubles_count: number;
    alive: boolean;
  }
  
  export default GameUser;
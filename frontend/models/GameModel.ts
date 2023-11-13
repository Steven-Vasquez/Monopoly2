import { Player } from "../models/Player.ts";

class GameModel {
    players: Player[];

    constructor(players: Player[]) {
        this.players = players;
    }
}
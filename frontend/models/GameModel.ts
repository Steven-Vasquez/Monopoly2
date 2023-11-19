import { Player } from "../models/Player.ts";

export class GameModel {
    players: Player[];

    constructor(players: Player[]) {
        this.players = players;
    }

    addPlayer(player: Player) {
        this.players.push(player);
        return this;
    }

    removePlayerById(id: number) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].playerId == id) {
                this.players.splice(i, 1);
            }
        } 
        return this;
    }

    getPlayers() {
        return this.players;
    }

    get() {
        return this;
    }
}
import { Inventory } from "./Inventory.ts";

export class Player {
    playerId: number;
    name: string;
    token?: string;
    currPos: number;
    playOrder: number;
    doublesCount: number;
    inventory: Inventory;
    alive: boolean;

    constructor (playerId: number, token: string, currPos: number, playOrder: number, doublesCount: number, inventory?: Inventory, name?: string) {
        this.playerId = playerId;
        this.currPos = currPos;
        this.playOrder = playOrder;
        this.doublesCount = doublesCount;
        this.token = token;
        this.name = name ? name : `Player ${playOrder + 1}`
        this.inventory = inventory ? inventory : new Inventory([], [], 0, 0, 0);
        this.alive = true;
    }
}
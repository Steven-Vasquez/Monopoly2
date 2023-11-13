import { Inventory } from "./Inventory.ts";

export class Player {
    currPos: number;
    playOrder: number;
    doublesCount: number;
    inventory: Inventory

    constructor (currPos: number, playOrder: number, doublesCount: number, inventory: Inventory) {
        this.currPos = currPos;
        this.playOrder = playOrder;
        this.doublesCount = doublesCount;
        this.inventory = inventory;
    }
}
import { TitleDeed } from "../models/TitleDeed.ts"

export class Inventory {
    titleDeeds: TitleDeed[];
    chanceCards: String[];
    jailCards: number;
    jailTurns: number;
    balance: number;

    constructor (
        titleDeeds: TitleDeed[],
        chanceCards: String[],
        jailCards: number,
        jailTurns: number,
        balance: number) {
            this.titleDeeds = titleDeeds;
            this.chanceCards = chanceCards;
            this.jailCards = jailCards;
            this.jailTurns = jailTurns;
            this.balance = balance;
    }
}
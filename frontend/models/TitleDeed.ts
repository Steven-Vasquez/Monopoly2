export class TitleDeed {
    type: DeedType;

    constructor(type: DeedType) {
        this.type = type;
    }
}

export enum DeedType {
    Brown,
    Sky,
    Pink,
    Orange,
    Red,
    Yellow,
    Green,
    Blue,
    Railroad,
    ElectricCompany,
    WaterWorks
}
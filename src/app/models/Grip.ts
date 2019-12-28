import { GripWidth, GripType } from './enums';

export class Grip {

    constructor(
        public typeOfGrip: GripType = GripType.NoGrip,
        public width: GripWidth = GripWidth.NoGrip) {
        this.typeOfGrip = typeOfGrip;
        this.width = width;
    }
}

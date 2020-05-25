import { WeightUnit } from './enums';

export interface ISet {
    weight?: number;
    weightUnit?: WeightUnit;
    reps?: number;
    time?: number;
}
export interface IRunningSet {
    isComplete: boolean;
    isActive: boolean;
    time?: number
}

export class Set implements ISet {
    public weight?: number;
    public weightUnit?: WeightUnit;
    public reps?: number;
    public time?: number;

    constructor(options: ISet) {
        this.weight = options.weight;
        this.weightUnit = options.weightUnit || WeightUnit.Lbs;
        this.reps = options.reps;
        this.time = options.time;
    }

    static copySet(sourceSet: Set, options?: ISet): Set {
        const newSet = new Set({...sourceSet, ...options });
        return newSet;
    }

}

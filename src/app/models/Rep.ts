import { WeightUnit } from './enums';

export interface IRep {
    weight?: number;
    weightUnit?: WeightUnit;
    times?: number;
    seconds?: number;
    isActive?: boolean;
    isComplete?: boolean;
}

export class Rep {
    public weight?: number;
    public weightUnit?: WeightUnit;
    public times?: number;
    public seconds?: number;
    public isActive?: boolean;
    public isComplete?: boolean;

    constructor(options: IRep) {
        this.weight = options.weight;
        this.weightUnit = options.weightUnit || WeightUnit.Lbs;
        this.times = options.times;
        this.seconds = options.seconds;
        this.isActive = options.isActive || false;
        this.isComplete = options.isComplete || false;
    }

    public static copyRepsAndReset(reps: Rep[]): Rep[] {
        return reps.map(rep => {
            return Rep.copyRep(rep, {
                isActive: false,
                isComplete: false
            });
        });
    }

    static copyRepsAndSetToActive(reps: Rep[], activeRepIndex: number): Rep[] {
        return reps.map((rep, index) => {
            return Rep.copyRep(rep, {
                isActive: index === activeRepIndex
            });
        });
    }

    static copyRepsAndSetToInactive(reps: Rep[]): Rep[] {
        return reps.map(rep => {
            return Rep.copyRep(rep, {
                isActive: false
            });
        });
    }
    static copyRepsAndSetCompleteState(reps: Rep[], completeIndex: number, isCompleteState: boolean): Rep[] {
        return reps.map((rep, index) => {
            return Rep.copyRep(rep, {
                isComplete: index === completeIndex ? isCompleteState : rep.isComplete
            });
        });
    }

    static copyRepsAndSetToComplete(reps: Rep[], completeIndex: number): Rep[] {
        return Rep.copyRepsAndSetCompleteState(reps, completeIndex, true);
    }
    static copyRepsAndSetToIncomplete(reps: Rep[], completeIndex: number): Rep[] {
        return Rep.copyRepsAndSetCompleteState(reps, completeIndex, false);
    }

    static copyRep(sourceRep: Rep, options?: IRep): Rep {
        const newRep = new Rep({...sourceRep, ...options });
        return newRep;
    }

}

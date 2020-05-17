import { WeightUnit } from './enums';

export interface IRep {
    weight?: number;
    weightUnit?: WeightUnit;
    times?: number;
    seconds?: number;
    // isActive?: boolean;
    // isComplete?: boolean;
}
export interface IRunningRep {
    isComplete: boolean;
    isActive: boolean;
    seconds?: number
}

export class Rep {
    public weight?: number;
    public weightUnit?: WeightUnit;
    public times?: number;
    public seconds?: number;
    // public isActive?: boolean;
    // public isComplete?: boolean;

    constructor(options: IRep) {
        this.weight = options.weight;
        this.weightUnit = options.weightUnit || WeightUnit.Lbs;
        this.times = options.times;
        this.seconds = options.seconds;
        // this.isActive = options.isActive || false;
        // this.isComplete = options.isComplete || false;
    }

    // public static copyRunningRepsAndReset(reps: IRunningRep[]): IRunningRep[] {
    //     return reps.map(rep => {
    //         return  {
    //             isActive: false,
    //             isComplete: false
    //         };
    //     });
    // }

    // static copyRunningRepsAndSetToActive(reps: IRunningRep[], activeRepIndex: number): IRunningRep[] {
    //     return reps.map((rep, index) => {
    //         return {
    //             isActive: index === activeRepIndex,
    //             isComplete: rep.isComplete,
    //         };
    //     });
    // }

    // static copyRunningRepsAndSetToInactive(reps: IRunningRep[]): IRunningRep[] {
    //     return reps.map(rep => {
    //         return {
    //             isActive: false,
    //             isComplete: rep.isComplete,
    //         };
    //     });
    // }
    // static copyRunningRepsAndSetCompleteState(reps: IRunningRep[], completeIndex: number, isCompleteState: boolean)
    // : IRunningRep[] {
    //     return reps.map((rep, index) => {
    //         return {
    //             isComplete: (index === completeIndex ? isCompleteState : rep.isComplete),
    //             isActive: rep.isComplete,
    //         };
    //     });
    // }

    // static copyRunningRepsAndSetToComplete(reps: IRunningRep[], completeIndex: number): IRunningRep[] {
    //     return Rep.copyRunningRepsAndSetCompleteState(reps, completeIndex, true);
    // }
    // static copyRunningRepsAndSetToIncomplete(reps: IRunningRep[], completeIndex: number): IRunningRep[] {
    //     return Rep.copyRunningRepsAndSetCompleteState(reps, completeIndex, false);
    // }

    static copyRep(sourceRep: Rep, options?: IRep): Rep {
        const newRep = new Rep({...sourceRep, ...options });
        return newRep;
    }

}

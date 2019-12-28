import { Action } from '@ngrx/store';
import { ExerciseSetBean } from 'src/app/models/ExerciseSet';
import { ExerciseBean } from 'src/app/models/Exercise';

export enum ExerciseSetActionsTypes {
    AddExerciseSets = '[Exercise Set] Add exercise set(s)',
    DeleteExerciseSet = '[Exercise Set] Delete exercise set',
    SwitchExercisesInSet = '[Exercise Set] Switch two exercises in set',
}
export class AddExerciseSets implements Action {
    readonly type = ExerciseSetActionsTypes.AddExerciseSets;
    constructor(public payload: {
        dayId: string,
        sets: ExerciseSetBean[],
        exes: ExerciseBean[]
    }) { }
}
export class DeleteExerciseSet implements Action {
    readonly type = ExerciseSetActionsTypes.DeleteExerciseSet;
    constructor(public payload: {
        dayId: string,
        setId: string,
    }) { }
}
export class SwitchExercisesInSet implements Action {
    readonly type = ExerciseSetActionsTypes.SwitchExercisesInSet;
    constructor(public payload: {
        setId: string,
        lowIndex: number
    }) { }
}

export type ExerciseSetActions =
    AddExerciseSets |
    DeleteExerciseSet |
    SwitchExercisesInSet
    ;

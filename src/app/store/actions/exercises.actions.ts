import { Action } from '@ngrx/store';
import { Set } from 'src/app/models/Set';
import { ExerciseBean } from 'src/app/models/Exercise';

export enum ExerciseActionsTypes {
    UpdateExercise = '[Exercise] update exercise',
    DeleteExercise = '[Exercise] Delete exercise',
    DeleteExerciseInProgress = '[Exercise] Delete exercise is in progress',
    AddSet = '[Exercise] Add set',
    DeleteSet = '[Exercise] Delete set',
    UpdateSet = '[Exercise] Update set',
}

export class DeleteExercise implements Action {
    readonly type = ExerciseActionsTypes.DeleteExercise;
    constructor(public payload: {
        dayId: string, setId: string, exeId: string, mediaId: string, deleteSet: boolean
    }) { }
}
export class DeleteExerciseInProgress implements Action {
    readonly type = ExerciseActionsTypes.DeleteExerciseInProgress;
    constructor(public payload: {
        dayId: string, setId: string, exeId: string, mediaId: string, deleteSet: boolean
    }) { }
}
export class UpdateExercise implements Action {
    readonly type = ExerciseActionsTypes.UpdateExercise;
    constructor(public payload: {
        exercise: ExerciseBean
    }) { }
}

export class AddSet implements Action {
    readonly type = ExerciseActionsTypes.AddSet;
    constructor(public payload: {
        copyFromIndex: number,
        exerciseId: string,
    }) { }
}
export class DeleteSet implements Action {
    readonly type = ExerciseActionsTypes.DeleteSet;
    constructor(public payload: {
        indexToDelete: number,
        exerciseId: string,
    }) { }
}
export class UpdateSet implements Action {
    readonly type = ExerciseActionsTypes.UpdateSet;
    constructor(public payload: {
        set: Set,
        exerciseId: string,
        setIndex: number
    }) { }
}

export type ExerciseActions =
    AddSet |
    DeleteSet |
    DeleteExercise |
    DeleteExerciseInProgress |
    UpdateExercise |
    UpdateSet
    ;

import { Action } from '@ngrx/store';
import { Rep } from 'src/app/models/Rep';
import { ExerciseBean } from 'src/app/models/Exercise';

export enum ExerciseActionsTypes {
    UpdateExercise = '[Exercise] update exercise set',
    DeleteExercise = '[Exercise] Delete exercise',
    DeleteExerciseInProgress = '[Exercise] Delete exercise is in progress',
    ResetReps = '[Exercise] Reset all reps',
    SetRepsActiveState = '[Exercise] Set reps active state',
    SetRepsCompleteState = '[Exercise] Set rep complete state',
    SetRepsIncompleteState = '[Exercise] Set rep incomplete state',
    SetInactiveReps = '[Exercise] Set reps to inactive state',
    AddRep = '[Exercise] Add rep',
    DeleteRep = '[Exercise] Delete rep',
    UpdateRep = '[Exercise] Update rep',
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
export class ResetReps implements Action {
    readonly type = ExerciseActionsTypes.ResetReps;
    constructor(public payload: { exerciseId: string }) { }
}
export class SetInactiveReps implements Action {
    readonly type = ExerciseActionsTypes.SetInactiveReps;
    constructor(public payload: { exerciseId: string }) { }
}
export class SetRepsActiveState implements Action {
    readonly type = ExerciseActionsTypes.SetRepsActiveState;
    constructor(public payload: {
        exerciseId: string,
        activeIndex: number
    }) { }
}
export class SetRepsCompleteState implements Action {
    readonly type = ExerciseActionsTypes.SetRepsCompleteState;
    constructor(public payload: {
        exerciseId: string,
        completeIndex: number
    }) { }
}
export class SetRepsIncompleteState implements Action {
    readonly type = ExerciseActionsTypes.SetRepsIncompleteState;
    constructor(public payload: {
        exerciseId: string,
        incompleteIndex: number
    }) { }
}
export class AddRep implements Action {
    readonly type = ExerciseActionsTypes.AddRep;
    constructor(public payload: {
        copyFromIndex: number,
        exerciseId: string,
    }) { }
}
export class DeleteRep implements Action {
    readonly type = ExerciseActionsTypes.DeleteRep;
    constructor(public payload: {
        indexToDelete: number,
        exerciseId: string,
    }) { }
}
export class UpdateRep implements Action {
    readonly type = ExerciseActionsTypes.UpdateRep;
    constructor(public payload: {
        rep: Rep,
        exerciseId: string,
        repIndex: number
    }) { }
}

export type ExerciseActions =
    ResetReps |
    SetRepsActiveState |
    SetRepsCompleteState |
    SetRepsIncompleteState |
    SetInactiveReps |
    AddRep |
    DeleteRep |
    DeleteExercise |
    DeleteExerciseInProgress |
    UpdateExercise |
    UpdateRep
    ;

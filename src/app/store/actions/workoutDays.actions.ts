import { Action } from '@ngrx/store';
import { DisplayMode, RunningState } from 'src/app/models/enums';
import { WorkoutDayBean } from 'src/app/models/WorkoutDay';
import { IRunningWorkoutDayState } from '../state/data.state';

export enum Direction {
    Forward = 1,
    Backword = 2
}

export enum WorkoutDaysActionsTypes {
    SelectWorkoutDay = '[WorkoutDays] Select workout day',
    DeleteWorkoutDay = '[WorkoutDays] Delete workout day',
    DeleteWorkoutDaySuccess = '[WorkoutDays] Workout day has been deleted',
    AddWorkoutDay = '[WorkoutDays] Add workout day',
    AddWorkoutDaySuccess = '[WorkoutDays] workout day has been added',
    MoveWorkoutDay = '[WorkoutDays] Move workout day',
    MoveWorkoutDaySuccess = '[WorkoutDays] Workout day has been moved',
    UpdateWorkoutDay = '[WorkoutDays] Update Workout day',

    StartFirstExercise = '[WorkoutDays] Start first exercise',
    StartExercise = '[WorkoutDays] Start an exercise',
    RepeatExercise = '[WorkoutDays] Repeat a workout day exercises',
    StopExercise = '[WorkoutDays] Exercise should stop',
    ExerciseCompleted = '[WorkoutDays] Exercise has completed',
    ChangeDisplayMode = '[WorkoutDays] Change workout day display mode',
    ChangeDisplayModeSuccess = '[WorkoutDays] Workout day display mode has changed',

    ReorderExerciseSets = '[WorkoutDays] Reorder exercise sets',
}

export class MoveWorkoutDay implements Action {
    readonly type = WorkoutDaysActionsTypes.MoveWorkoutDay;
    constructor(public payload: { direction: Direction }) { }
}

export class MoveWorkoutDaySuccess implements Action {
    readonly type = WorkoutDaysActionsTypes.MoveWorkoutDaySuccess;
    constructor(public payload: { direction: Direction }) { }
}

export class SelectWorkoutDay implements Action {
    readonly type = WorkoutDaysActionsTypes.SelectWorkoutDay;
    constructor(public payload: {
        workoutId: string;
        dayId: string;
        // setId?: string;
    }) { }
}

export class DeleteWorkoutDay implements Action {
    readonly type = WorkoutDaysActionsTypes.DeleteWorkoutDay;
    constructor(public payload: {
        dayId: string,
    }) { }
}
export class DeleteWorkoutDaySuccess implements Action {
    readonly type = WorkoutDaysActionsTypes.DeleteWorkoutDaySuccess;
    constructor(public payload: {
        dayId: string,
    }) { }
}

export class UpdateWorkoutDay implements Action {
    readonly type = WorkoutDaysActionsTypes.UpdateWorkoutDay;
    constructor(public payload: {
        dayId: string,
        name: string,
        repeatsCount: number,
    }) { }
}

export class AddWorkoutDay implements Action {
    readonly type = WorkoutDaysActionsTypes.AddWorkoutDay;
    constructor(public payload: {
        workoutId: string,
        day: WorkoutDayBean,
        index2AddFrom: number
    }) {
        payload.day.displayMode = DisplayMode.Edit;
    }
}

export class AddWorkoutDaySuccess implements Action {
    readonly type = WorkoutDaysActionsTypes.AddWorkoutDaySuccess;
    constructor(public payload: {
        workoutId: string,
        day: WorkoutDayBean,
        index2AddFrom: number
    }) { }
}
export interface ChangeWorkoutDayState {
    workoutId: string;
    dayId: string;
    exerciseSets?: string[];
    displayMode?: DisplayMode;
    name?: string;
}
export class StartFirstExercise implements Action {
    readonly type = WorkoutDaysActionsTypes.StartFirstExercise;
    constructor(public payload: IRunningWorkoutDayState) {
        payload.runningExerciseSetIndex = 0;
        payload.repeatsCompleted = 0;
        payload.runningState = RunningState.Running;
    }
}
export class StartExercise implements Action {
    readonly type = WorkoutDaysActionsTypes.StartExercise;
    constructor(public payload: IRunningWorkoutDayState) {
        payload.runningState = RunningState.Running;
    }
}
export class RepeatExercise implements Action {
    readonly type = WorkoutDaysActionsTypes.RepeatExercise;
    constructor(public payload: IRunningWorkoutDayState) {
        payload.runningState = RunningState.Running;
        payload.runningExerciseSetIndex = 0;
    }
}
export class StopExercise implements Action {
    readonly type = WorkoutDaysActionsTypes.StopExercise;
    constructor(public payload: IRunningWorkoutDayState) {
        payload.runningState = RunningState.NA;
    }
}
export class ExerciseCompleted implements Action {
    readonly type = WorkoutDaysActionsTypes.ExerciseCompleted;
    constructor(public payload: Partial<IRunningWorkoutDayState>) {
        payload.runningState = RunningState.Completed;
    }
}
export class ChangeDisplayMode implements Action {
    readonly type = WorkoutDaysActionsTypes.ChangeDisplayMode;
    constructor(public payload: ChangeWorkoutDayState) {
    }
}
export class ChangeDisplayModeSuccess implements Action {
    readonly type = WorkoutDaysActionsTypes.ChangeDisplayModeSuccess;

    constructor(public payload: ChangeWorkoutDayState) { }
}
export class ReorderExerciseSets implements Action {
    readonly type = WorkoutDaysActionsTypes.ReorderExerciseSets;
    constructor(public payload: {
        dayId: string,
        fromIndex: number,
        toIndex: number,
    }) { }
}

export type WorkoutDaysActions =
    SelectWorkoutDay |
    DeleteWorkoutDay |
    DeleteWorkoutDaySuccess |
    AddWorkoutDay |
    AddWorkoutDaySuccess |
    StartFirstExercise |
    MoveWorkoutDay |
    MoveWorkoutDaySuccess |
    UpdateWorkoutDay |
    StartExercise |
    RepeatExercise |
    StopExercise |
    ExerciseCompleted |
    ChangeDisplayMode |
    ChangeDisplayModeSuccess |
    ReorderExerciseSets
    ;

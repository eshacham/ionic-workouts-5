import { Action } from '@ngrx/store';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';

export enum ExerciseMediaActionsTypes {
    AddExerciseMedia = '[ExerciseMedia] Add a new exercise media',
    AddExerciseMediaSuccess = '[ExerciseMedia] Eexercise media has been added',
    UpdateExerciseMedia = '[ExerciseMedia] Update exercise media',
    UpdateExerciseMediaSuccess = '[ExerciseMedia] Exercise media has been updated',
    UpdateExerciseMediaUsage = '[ExerciseMedia] Update exercise medias usage',
    UpdateExerciseMediaUsageSuccess = '[ExerciseMedia] exercise medias usage has been updated',
    DeleteExerciseMedia = '[ExerciseMedia] Delete exercise media',
    DeleteExerciseMediaSuccess = '[ExerciseMedia] Exercise media has been deleted',
}

export class AddExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.AddExerciseMedia;
    constructor (public payload: {
        origPath: string,
        origName: string,
        newName: string,
    }) { }
}
export class AddExerciseMediaSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.AddExerciseMediaSuccess;
    constructor (public payload: {
        exerciseMedia: ExerciseMediaBean,
    }) { }
}
export class UpdateExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.UpdateExerciseMedia;
    constructor(public payload: {
        id: string,
        name?: string,
        mediaUsageCounterInc?: number
    }) { }
}
export class UpdateExerciseMediaSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.UpdateExerciseMediaSuccess;
    constructor(public payload: {
        id: string,
        name?: string,
        mediaUsageCounterInc?: number
    }) { }
}
export class UpdateExerciseMediaUsage implements Action {
    readonly type = ExerciseMediaActionsTypes.UpdateExerciseMediaUsage;
    constructor(public payload: {
        ids: string[],
        mediaUsageCounterInc?: number
    }) { }
}
export class UpdateExerciseMediaUsageSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.UpdateExerciseMediaUsageSuccess;
    constructor(public payload: {
        ids: string[],
        mediaUsageCounterInc?: number
    }) { }
}
export class DeleteExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.DeleteExerciseMedia;
    constructor (public payload: {
        image: ExerciseMediaBean,
    }) { }
}
export class DeleteExerciseMediaSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.DeleteExerciseMediaSuccess;
    constructor (public payload: {
        imageId: string,
    }) { }
}

export type ExerciseMediaActions =
    AddExerciseMedia |
    AddExerciseMediaSuccess |
    UpdateExerciseMedia |
    UpdateExerciseMediaSuccess |
    UpdateExerciseMediaUsage |
    UpdateExerciseMediaUsageSuccess |
    DeleteExerciseMedia |
    DeleteExerciseMediaSuccess
    ;

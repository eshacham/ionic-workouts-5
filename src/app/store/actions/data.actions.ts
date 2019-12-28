import { Action } from '@ngrx/store';
import { AllDataMaps } from 'src/app/models/interfaces';

export enum DataActionsTypes {
    GetData = '[Data] Get app data',
    GetDataSuccess = '[Data] Get app data success',
    GetDataError = '[Data] Get app data error',
    DataReset = '[Data] Data have been reset',
    UpdateWorkouts = '[Data] Update workouts',
    WorkoutsSavedSuccess = '[Data] Workouts have been updated',
    WorkoutsSavedError = '[Data] Workouts saved error',
    UpdateImages = '[Data] Update images',
    ImagesSavedSuccess = '[Data] Images have been updated',
    ImagesSavedError = '[Data] Images saved error',
}
export class GetData implements Action {
    public readonly type = DataActionsTypes.GetData;
}

export class GetDataSuccess implements Action {
    public readonly type = DataActionsTypes.GetDataSuccess;
    constructor(public payload: AllDataMaps) { }
}
export class GetDataError implements Action {
    public readonly type = DataActionsTypes.GetDataError;
    constructor(public payload: string) { }
}

export class DataReset implements Action {
    readonly type = DataActionsTypes.DataReset;
    constructor() { }
}

export class UpdateWorkouts implements Action {
    readonly type = DataActionsTypes.UpdateWorkouts;
    constructor() { }
}

export class WorkoutsSavedSuccess implements Action {
    readonly type = DataActionsTypes.WorkoutsSavedSuccess;
    constructor() { }
}
export class WorkoutsSavedError implements Action {
    readonly type = DataActionsTypes.WorkoutsSavedError;
    constructor(public payload: string) { }
}

export class UpdateImages implements Action {
    readonly type = DataActionsTypes.UpdateImages;
    constructor() { }
}
export class ImagesSavedSuccess implements Action {
    readonly type = DataActionsTypes.ImagesSavedSuccess;
    constructor() { }
}
export class ImagesSavedError implements Action {
    readonly type = DataActionsTypes.ImagesSavedError;
    constructor(public payload: string) { }
}

export type DataActions =
    GetData |
    GetDataSuccess |
    GetDataError |
    DataReset |
    WorkoutsSavedSuccess |
    WorkoutsSavedError |
    UpdateImages |
    ImagesSavedSuccess |
    ImagesSavedError
    ;

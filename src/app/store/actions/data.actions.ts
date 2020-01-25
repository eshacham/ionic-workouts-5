import { Action } from '@ngrx/store';
import { AllDataMaps } from 'src/app/models/interfaces';

export enum DataActionsTypes {
    LoadData = '[Data] Load app data',
    LoadDataSuccess = '[Data] Get app data success',
    LoadDataError = '[Data] Load app data error',

    LoadTheme = '[Data] Load app theme',
    LoadThemeSuccess = '[Data] Get app theme success',
    LoadThemeError = '[Data] Load app theme error',

    ResetData = '[Data] Data needs to be reset',
    ResetDataSuccess = '[Data] Data have been reset',
    ResetDataError = '[Data] Data reset error',

    UpdateWorkouts = '[Data] Update workouts',
    WorkoutsSavedSuccess = '[Data] Workouts have been updated',
    WorkoutsSavedError = '[Data] Workouts saved error',

    UpdateImages = '[Data] Update images',
    ImagesSavedSuccess = '[Data] Images have been updated',
    ImagesSavedError = '[Data] Images saved error',

    SetTheme = '[Data] Set the selected theme',
    ThemeSavedSuccess = '[Data] Theme have been updated',
    ThemeSavedError = '[Data] Theme saved error',
}
export class LoadData implements Action {
    public readonly type = DataActionsTypes.LoadData;
}

export class LoadDataSuccess implements Action {
    public readonly type = DataActionsTypes.LoadDataSuccess;
    constructor(public payload: AllDataMaps) { }
}
export class LoadDataError implements Action {
    public readonly type = DataActionsTypes.LoadDataError;
    constructor(public payload: string) { }
}

export class LoadTheme implements Action {
    public readonly type = DataActionsTypes.LoadTheme;
}

export class LoadThemeSuccess implements Action {
    public readonly type = DataActionsTypes.LoadThemeSuccess;
    constructor(public theme: string) { }
}
export class LoadThemeError implements Action {
    public readonly type = DataActionsTypes.LoadThemeError;
    constructor(public payload: string) { }
}

export class ResetData implements Action {
    public readonly type = DataActionsTypes.ResetData;
    constructor() { }
}
export class ResetDataSuccess implements Action {
    readonly type = DataActionsTypes.ResetDataSuccess;
    constructor() { }
}

export class ResetDataError implements Action {
    public readonly type = DataActionsTypes.ResetDataError;
    constructor(public payload: string) { }
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
export class SetTheme implements Action {
    readonly type = DataActionsTypes.SetTheme;
    constructor(public payload: string) { }
}
export class ThemeSavedSuccess implements Action {
    readonly type = DataActionsTypes.ThemeSavedSuccess;
    constructor(public payload: string) { }
}
export class ThemeSavedError implements Action {
    readonly type = DataActionsTypes.ThemeSavedError;
    constructor(public payload: string) { }
}

export type DataActions =
    LoadData |
    LoadDataSuccess |
    LoadDataError |
    LoadTheme |
    LoadThemeSuccess |
    LoadThemeError |
    ResetData |
    ResetDataSuccess |
    ResetDataError |
    WorkoutsSavedSuccess |
    WorkoutsSavedError |
    UpdateImages |
    ImagesSavedSuccess |
    ImagesSavedError |
    SetTheme |
    ThemeSavedSuccess |
    ThemeSavedError
    ;

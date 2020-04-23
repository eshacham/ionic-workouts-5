import { Action } from '@ngrx/store';
import { AllDataMaps } from 'src/app/models/interfaces';
import { ISignedInUser } from '../state/data.state';
import { Version } from 'src/app/models/Version';
import { TermsOfUse } from 'src/app/models/TermsOfUse';

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

    ClearError = '[Data] Clear the last error',

    SetSignedInUser = '[Data] Set SignedIn User',

    LoadReleaseNotesAndTermsOfUse = '[Data] Load release notes and terms of use',
    LoadReleaseNotesAndTermsOfUseSuccess = '[Data] Get release notes and terms of use success',
    LoadReleaseNotesAndTermsOfUseError = '[Data] Load release notes and terms of useerror',

    AppOnline = '[Data] Application is Online',
    AppOffline = '[Data] Application is Offline',

    TermsAccpeted = '[Data] Terms of Use has been accpeted',
    TermsAccpetedSuccess = '[Data] Terms of Use has been accpeted and saved',
    TermsAccpetedError = '[Data] Terms of Use has been accpeted and erred saving',

    TermsNotAccpeted = '[Data] Terms of Use has not been accpeted',
    TermsNotAccpetedSuccess = '[Data] Terms of Use has not been accpeted and saved',
    TermsNotAccpetedError = '[Data] Terms of Use has not been accpeted and erred saving',
}

export class AppOnline implements Action {
    public readonly type = DataActionsTypes.AppOnline;
}

export class AppOffline implements Action {
    public readonly type = DataActionsTypes.AppOffline;
}
export class TermsAccpeted implements Action {
    public readonly type = DataActionsTypes.TermsAccpeted;
    constructor(public payload: TermsOfUse) { }
}

export class TermsNotAccpeted implements Action {
    public readonly type = DataActionsTypes.TermsNotAccpeted;
    constructor(public payload: TermsOfUse) { }
}
export class TermsAccpetedSuccess implements Action {
    public readonly type = DataActionsTypes.TermsAccpetedSuccess;
    constructor(public payload: TermsOfUse) { }
}

export class TermsNotAccpetedSuccess implements Action {
    public readonly type = DataActionsTypes.TermsNotAccpetedSuccess;
    constructor(public payload: TermsOfUse) { }

}export class TermsAccpetedError implements Action {
    public readonly type = DataActionsTypes.TermsAccpetedError;
    constructor(public payload: string) { }

}

export class TermsNotAccpetedError implements Action {
    public readonly type = DataActionsTypes.TermsNotAccpetedError;
    constructor(public payload: string) { }

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

export class ClearError implements Action {
    readonly type = DataActionsTypes.ClearError;
    constructor() { }
}
export class SetSignedInUser implements Action {
    readonly type = DataActionsTypes.SetSignedInUser;
    constructor(public payload: ISignedInUser) { }
}

export class LoadReleaseNotesAndTermsOfUse implements Action {
    public readonly type = DataActionsTypes.LoadReleaseNotesAndTermsOfUse;
}

export class LoadReleaseNotesAndTermsOfUseSuccess implements Action {
    public readonly type = DataActionsTypes.LoadReleaseNotesAndTermsOfUseSuccess;
    constructor(public data: { releaseNotes: Record<string, Version>, termsOfUse: TermsOfUse }) { }
}
export class LoadReleaseNotesAndTermsOfUseError implements Action {
    public readonly type = DataActionsTypes.LoadReleaseNotesAndTermsOfUseError;
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
    ThemeSavedError |
    ClearError |
    SetSignedInUser |
    LoadReleaseNotesAndTermsOfUse |
    LoadReleaseNotesAndTermsOfUseSuccess |
    LoadReleaseNotesAndTermsOfUseError |
    AppOnline |
    AppOffline |
    TermsAccpeted |
    TermsNotAccpeted |
    TermsAccpetedSuccess |
    TermsNotAccpetedSuccess |
    TermsAccpetedError |
    TermsNotAccpetedError
    ;

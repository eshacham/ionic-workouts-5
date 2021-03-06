import { Version } from 'src/app/models/Version';
import { TermsOfUse } from 'src/app/models/TermsOfUse';
import { RunningState } from 'src/app/models/enums';

export interface ISignedInUser {
    username: string;
    identityId: string;
}

export interface IRunningWorkoutDayState {
    workoutId: string;
    dayId: string;
    setId?: string;
    runningState: RunningState;
    runningExerciseSetIndex?: number;
    repeatsCompleted?: number;
}


export interface IDataState {
    hasDataBeenReset: boolean;
    hasDataBeenLoaded: boolean;
    workoutImportInProgress: boolean;
    authActionInProgress: boolean;
    workoutExportInProgress: boolean;
    error: string;
    theme: string;
    signedInUser: ISignedInUser;
    releaseNotes: Record<string, Version>;
    termsOfUse: TermsOfUse;
    isOnline?: boolean;
    runningWorkoutDayState ?: IRunningWorkoutDayState;
}
export const initialDataState: IDataState = {
    hasDataBeenReset: false,
    hasDataBeenLoaded: false,
    workoutImportInProgress: false,
    authActionInProgress: false,
    workoutExportInProgress: false,
    error: null,
    theme: null,
    signedInUser: null,
    releaseNotes: {},
    termsOfUse: null,
    isOnline: false,
    runningWorkoutDayState: null,
};

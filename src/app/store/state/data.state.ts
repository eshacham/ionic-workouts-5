import { Version } from 'src/app/models/Version';
import { TermsOfUse } from 'src/app/models/TermsOfUse';
import { RunningState } from 'src/app/models/enums';
// import { IRunningRep } from 'src/app/models/Rep';

export interface ISignedInUser {
    username: string;
    identityId: string;
}

export interface IRunningWorkoutDayState {
    workoutId: string;
    dayId: string;
    setId?: string
    runningState?: RunningState;
    runningExerciseSetIndex?: number;
    repeatsCompleted?: number;
    // scrollToExerciseSetIndex?: number;
    // scrollToExerciseSetId?: string;
    // scrollToExerciseSet?: boolean;
}

// export interface IRunningExerciseState {
//     runningReps: IRunningRep[]
// }

export interface IDataState {
    hasDataBeenReset: boolean;
    hasDataBeenLoaded: boolean;
    workoutImportInProgress: boolean;
    workoutExportInProgress: boolean;
    error: string;
    theme: string;
    signedInUser: ISignedInUser;
    // scrollToExerciseMediaId?: string;
    releaseNotes: Record<string, Version>;
    termsOfUse: TermsOfUse;
    isOnline?: boolean;
    runningWorkoutDayState ?: IRunningWorkoutDayState;
    // runningExerciseState?: IRunningExerciseState;
}
export const initialDataState: IDataState = {
    hasDataBeenReset: false,
    hasDataBeenLoaded: false,
    workoutImportInProgress: false,
    workoutExportInProgress: false,
    error: null,
    theme: null,
    signedInUser: null,
    // scrollToExerciseMediaId: null,
    releaseNotes: {},
    termsOfUse: null,
    isOnline: false,
    runningWorkoutDayState: null,
    // runningExerciseState: null,
};

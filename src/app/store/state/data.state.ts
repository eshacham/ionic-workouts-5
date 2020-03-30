import { Version } from "src/app/models/Version";

export interface ISignedInUser {
    username: string;
    identityId: string;
}

export interface IDataState {
    hasDataBeenReset: boolean;
    hasDataBeenLoaded: boolean;
    workoutImportInProgress: boolean;
    workoutExportInProgress: boolean;
    error: string;
    theme: string;
    signedInUser: ISignedInUser;
    scrollToExerciseMediaId?: string;
    releaseNotes: Record<string, Version>
}
export const initialDataState: IDataState = {
    hasDataBeenReset: false,
    hasDataBeenLoaded: false,
    workoutImportInProgress: false,
    workoutExportInProgress: false,
    error: null,
    theme: null,
    signedInUser: null,
    scrollToExerciseMediaId: null,
    releaseNotes: {},
};

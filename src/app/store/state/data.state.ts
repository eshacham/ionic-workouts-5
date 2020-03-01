export interface IDataState {
    hasDataBeenReset: boolean;
    hasDataBeenLoaded: boolean;
    workoutImportInProgress: boolean;
    workoutExportInProgress: boolean;
    error: string;
    theme: string;
    signedInUser: string;
}
export const initialDataState: IDataState = {
    hasDataBeenReset: false,
    hasDataBeenLoaded: false,
    workoutImportInProgress: false,
    workoutExportInProgress: false,
    error: null,
    theme: null,
    signedInUser: null,
};

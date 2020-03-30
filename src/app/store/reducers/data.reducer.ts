import { DataActions, DataActionsTypes } from '../actions/data.actions';
import { IDataState, initialDataState } from '../state/data.state';
import { WorkoutsActions, WorkoutsActionsTypes, } from '../actions/workouts.actions';
import { ExerciseMediaActionsTypes, ExerciseMediaActions } from '../actions/exercisesMedia.actions';

export const dataReducers =
(state = initialDataState, action: DataActions | WorkoutsActions | ExerciseMediaActions)
: IDataState => {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                hasDataBeenLoaded: true,
                error: null,
            };
        }
        case DataActionsTypes.LoadReleaseNotesSuccess: {
            return {
                ...state,
                releaseNotes: action.releaseNotes,
                error: null,
            };
        }

        case DataActionsTypes.LoadThemeSuccess: {
            return {
                ...state,
                error: null,
                theme: action.theme,
            };
        }
        case DataActionsTypes.ResetDataSuccess: {
            return {
                ...state,
                hasDataBeenReset: true,
                error: null,
            };
        }
        case DataActionsTypes.ImagesSavedSuccess:
        case DataActionsTypes.WorkoutsSavedSuccess: {
            return {
                ...state,
                hasDataBeenReset: false,
                error: null,
            };
        }
        case DataActionsTypes.ThemeSavedSuccess: {
            return {
                ...state,
                error: null,
                theme: action.payload
            };
        }
        case DataActionsTypes.LoadDataError:
        case DataActionsTypes.LoadReleaseNotesError:
        case DataActionsTypes.LoadThemeError:
        case DataActionsTypes.WorkoutsSavedError:
        case DataActionsTypes.ThemeSavedError:
        case DataActionsTypes.ResetDataError:
        case DataActionsTypes.ImagesSavedError: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case DataActionsTypes.ClearError: {
            return {
                ...state,
                error: undefined,
            };
        }
        case WorkoutsActionsTypes.ImportWorkout: {
            return  {
                ...state,
                workoutImportInProgress: true
            };
        }
        case WorkoutsActionsTypes.ImportWorkoutSuccess: {
            return  {
                ...state,
                workoutImportInProgress: false
            };
        }
        case WorkoutsActionsTypes.ExportWorkout: {
            return  {
                ...state,
                workoutExportInProgress: true
            };
        }
        case WorkoutsActionsTypes.ExportWorkoutSuccess: {
            return  {
                ...state,
                workoutExportInProgress: false
            };
        }
        case DataActionsTypes.SetSignedInUser: {
            return  {
                ...state,
                signedInUser: action.payload
            };
        }
        case ExerciseMediaActionsTypes.ScrollToExerciseMedia: {
            return {
                ...state,
                scrollToExerciseMediaId: action.payload.imageId
            };
        }
        case ExerciseMediaActionsTypes.ResetScrollToExerciseMedia: {
            return {
                ...state,
                scrollToExerciseMediaId: undefined
            };
        }
        default: {
            return state;
        }
    }
};

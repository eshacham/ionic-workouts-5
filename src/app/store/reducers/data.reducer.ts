import { DataActions, DataActionsTypes } from '../actions/data.actions';
import { IDataState, initialDataState } from '../state/data.state';
import { WorkoutsActions, WorkoutsActionsTypes, } from '../actions/workouts.actions';

export const dataReducers =
(state = initialDataState, action: DataActions | WorkoutsActions)
: IDataState => {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                hasDataBeenLoaded: true,
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
        case DataActionsTypes.DataReset: {
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
        case DataActionsTypes.LoadThemeError:
        case DataActionsTypes.WorkoutsSavedError:
        case DataActionsTypes.ThemeSavedError:
        case DataActionsTypes.ImagesSavedError: {
            return {
                ...state,
                error: action.payload
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
        default: {
            return state;
        }
    }
};

import { DataActions, DataActionsTypes } from '../actions/data.actions';
import { IDataState, initialDataState } from '../state/data.state';
import { WorkoutsActions, WorkoutsActionsTypes, } from '../actions/workouts.actions';

export const dataReducers =
(state = initialDataState, action: DataActions | WorkoutsActions)
: IDataState => {
    switch (action.type) {
        case DataActionsTypes.GetDataSuccess: {
            return {
                ...state,
                hasDataBeenLoaded: true,
                error: null,
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
        case DataActionsTypes.GetDataError:
        case DataActionsTypes.WorkoutsSavedError:
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

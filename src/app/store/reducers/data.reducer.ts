import { DataActions, DataActionsTypes } from '../actions/data.actions';
import { IDataState, initialDataState } from '../state/data.state';
import { WorkoutsActions, WorkoutsActionsTypes, } from '../actions/workouts.actions';
import { ExerciseMediaActions } from '../actions/exercisesMedia.actions';
import { WorkoutDaysActionsTypes, WorkoutDaysActions } from '../actions/workoutDays.actions';

export function dataReducers (
    state = initialDataState,
    action: DataActions |
            WorkoutsActions |
            ExerciseMediaActions |
            WorkoutDaysActions
)
: IDataState {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                hasDataBeenLoaded: true,
                error: null,
            };
        }
        case DataActionsTypes.LoadReleaseNotesAndTermsOfUseSuccess: {
            return {
                ...state,
                releaseNotes: action.data.releaseNotes,
                termsOfUse: action.data.termsOfUse,
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
        case DataActionsTypes.AuthActionError:
        case DataActionsTypes.LoadReleaseNotesAndTermsOfUseError:
        case DataActionsTypes.TermsAccpetedError:
        case DataActionsTypes.TermsNotAccpetedError:
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
        case DataActionsTypes.AuthAction: {
            return  {
                ...state,
                authActionInProgress: true
            };
        }
        case DataActionsTypes.AuthActionSuccess: {
            return  {
                ...state,
                error: null,
                authActionInProgress: false
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
        case DataActionsTypes.AppOnline: {
            return {
                ...state,
                isOnline: true
            };
        }
        case DataActionsTypes.AppOffline: {
            return {
                ...state,
                isOnline: false
            };
        }
        case DataActionsTypes.TermsAccpetedSuccess: {
            return {
                ...state,
                termsOfUse: { ...state.termsOfUse, isAccepted: true },
            };
        }
        case DataActionsTypes.TermsNotAccpetedSuccess: {
            return {
                ...state,
                termsOfUse: { ...state.termsOfUse, isAccepted: false },
            };
        }
        case WorkoutsActionsTypes.UnselectWorkout:
        case WorkoutDaysActionsTypes.StopExercise: {
            return {
                ...state,
                runningWorkoutDayState: null
            }
        }
        case WorkoutDaysActionsTypes.RepeatExercise:
        case WorkoutDaysActionsTypes.StartFirstExercise: {
            return {
                ...state,
                runningWorkoutDayState: {
                    workoutId: action.payload.workoutId,
                    dayId: action.payload.dayId,
                    runningExerciseSetIndex: action.payload.runningExerciseSetIndex,
                    runningState: action.payload.runningState,
                    repeatsCompleted: action.payload.repeatsCompleted,
                }
            }
        }
        case WorkoutDaysActionsTypes.ExerciseCompleted:
        case WorkoutDaysActionsTypes.StartExercise: {
            return {
                ...state,
                runningWorkoutDayState: {
                    ...state.runningWorkoutDayState,
                    runningExerciseSetIndex: action.payload.runningExerciseSetIndex,
                    runningState: action.payload.runningState,
                }
            }
        }
        default: {
            return state;
        }
    }
};

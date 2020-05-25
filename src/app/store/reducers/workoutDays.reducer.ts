import { WorkoutDaysActions, WorkoutDaysActionsTypes } from '../actions/workoutDays.actions';
import { initialWorkoutDaysState, IWorkoutDaysState } from '../state/workoutDays.state';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { WorkoutsActions, WorkoutsActionsTypes } from '../actions/workouts.actions';
import { ExerciseSetActions, ExerciseSetActionsTypes } from '../actions/exerciseSets.actions';
import { filterMapByIds, removeItemFromMap } from './utils';
import { DisplayMode } from 'src/app/models/enums';

export function workoutDaysReducers (
    state = initialWorkoutDaysState,
    action: WorkoutDaysActions |
            WorkoutsActions |
            DataActions |
            ExerciseSetActions)
    : IWorkoutDaysState {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                byId: action.payload.days.byId,
            };
        }
        case WorkoutsActionsTypes.AddWorkoutSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.day.id]: action.payload.day
                }
            };
        }
        case WorkoutsActionsTypes.DeleteWorkoutInProgress: {
            const newMap = filterMapByIds(action.payload.days, state);
            return {
                ...state,
                byId: newMap
            };
        }
        case WorkoutsActionsTypes.ImportWorkoutSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...action.payload.workoutsData.days.byId,
                },
            };
        }
        case WorkoutDaysActionsTypes.AddWorkoutDaySuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.day.id]: action.payload.day,
                }
            };
        }
        case WorkoutsActionsTypes.UnselectWorkout: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.selectedDayId]: {
                        ...state.byId[action.payload.selectedDayId],
                        displayMode: DisplayMode.Display
                    }
                }
            };
        }
        case WorkoutDaysActionsTypes.UpdateWorkoutDay: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        name: action.payload.name,
                        repeatsCount: action.payload.repeatsCount,
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.DeleteWorkoutDaySuccess: {
            return {
                ...state,
                byId: removeItemFromMap(action.payload.dayId, state)
            };
        }
         case WorkoutDaysActionsTypes.ChangeDisplayModeSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        displayMode: action.payload.displayMode,
                    }
                },
            };
        }
        case ExerciseSetActionsTypes.DeleteExerciseSet: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        exerciseSets: state.byId[action.payload.dayId].exerciseSets
                            .filter(s => s !== action.payload.setId)
                    }
                },
            };
        }
        case ExerciseSetActionsTypes.AddExerciseSets: {
            const oldSets = state.byId[action.payload.dayId].exerciseSets || [];
            const newSets = action.payload.sets.map(s => s.id);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        exerciseSets: [...oldSets, ...newSets],
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.ReorderExerciseSets: {
            const oldSets = state.byId[action.payload.dayId].exerciseSets;
            const from = action.payload.fromIndex;
            const to = action.payload.toIndex;
            const newSets = [
                ...oldSets.slice(0, from),
                oldSets[to],
                ...oldSets.slice(from + 1, to),
                oldSets[from],
                ...oldSets.slice(to + 1)
            ];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        exerciseSets: newSets
                    }
                },
            };
        }
        default: {
            return state;
        }
    }
};

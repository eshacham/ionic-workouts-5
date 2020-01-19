import { WorkoutDaysActions, WorkoutDaysActionsTypes } from '../actions/workoutDays.actions';
import { initialWorkoutDaysState, IWorkoutDaysState } from '../state/workoutDays.state';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { WorkoutsActions, WorkoutsActionsTypes } from '../actions/workouts.actions';
import { ExerciseSetActions, ExerciseSetActionsTypes } from '../actions/exerciseSets.actions';
import { filterMapByIds, removeItemFromMap } from './utils';
import { DisplayMode } from 'src/app/models/enums';

export const workoutDaysReducers = (
    state = initialWorkoutDaysState,
    action: WorkoutDaysActions |
            WorkoutsActions |
            DataActions |
            ExerciseSetActions)
    : IWorkoutDaysState => {
    switch (action.type) {
        case DataActionsTypes.GetDataSuccess: {
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
                    [action.payload.day.id]: action.payload.day
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
                        name: action.payload.name
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
        case WorkoutDaysActionsTypes.StartFirstExercise:
        case WorkoutDaysActionsTypes.StartExercise:
        case WorkoutDaysActionsTypes.ExerciseCompleted:
        case WorkoutDaysActionsTypes.ChangeDisplayModeSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        runningExerciseSetIndex: action.payload.runningExerciseSetIndex,
                        displayMode: action.payload.displayMode,
                        runningState: action.payload.runningState,
                        scrollToExerciseSetIndex: action.payload.runningExerciseSetIndex
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.StopExercise: {
            let oldDisplayMode = state.byId[action.payload.id].displayMode || DisplayMode.Display;
            oldDisplayMode = oldDisplayMode === DisplayMode.Workout ? DisplayMode.Display : oldDisplayMode;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        runningExerciseSetIndex: action.payload.runningExerciseSetIndex,
                        displayMode: oldDisplayMode,
                        runningState: action.payload.runningState
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
                        scrollToExerciseSetIndex: oldSets.length + newSets.length - 1
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
        case WorkoutDaysActionsTypes.ResetExerciseSetScrollIntoView: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        scrollToExerciseSetIndex: undefined
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.SetExerciseSetInWorkoutDay: {
            const day = state.byId[action.payload.dayId];
            const index = day.exerciseSets.indexOf(action.payload.setId);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.dayId]: {
                        ...state.byId[action.payload.dayId],
                        scrollToExerciseSetIndex: index
                    }
                },
            };
        }
        default: {
            return state;
        }
    }
};

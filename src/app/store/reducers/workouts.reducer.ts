import { WorkoutsActions, WorkoutsActionsTypes, } from '../actions/workouts.actions';
import { initialWorkoutsState, IWorkoutsState } from '../state/workouts.state';
import { WorkoutDaysActionsTypes, WorkoutDaysActions, Direction } from '../actions/workoutDays.actions';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { removeItemFromMap, moveItemInArray } from './utils';

export function workoutsReducers (
    state = initialWorkoutsState,
    action: WorkoutsActions |
            WorkoutDaysActions |
            DataActions)
    : IWorkoutsState {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                byId: action.payload.workouts.byId,
            };
        }
        case WorkoutsActionsTypes.AddWorkoutSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.workout.id]: action.payload.workout
                }
            };
        }
        case WorkoutsActionsTypes.SelectWorkout: {
            return {
                ...state,
                selectedWorkoutId: action.payload.workoutId,
            };
        }
        case WorkoutsActionsTypes.UnselectWorkout: {
            return {
                ...state,
                selectedWorkoutId: undefined
            };
        }
        case WorkoutsActionsTypes.DeleteWorkoutInProgress: {
            const workoutId = action.payload.id;
            return {
                ...state,
                byId: removeItemFromMap(workoutId, state)
            };
        }
        case WorkoutDaysActionsTypes.SelectWorkoutDay:
        case WorkoutDaysActionsTypes.SetExerciseSetInWorkoutDay: {
            return {
                ...state,
                selectedWorkoutId: action.payload.workoutId,
                byId: {
                    ...state.byId,
                    [action.payload.workoutId]: {
                        ...state.byId[action.payload.workoutId],
                        selectedWorkoutDayId: action.payload.dayId,
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.DeleteWorkoutDaySuccess: {
            const dayId2Delete = action.payload.dayId;
            const selectedWorkout = state.byId[state.selectedWorkoutId];
            const oldDays = selectedWorkout ? selectedWorkout.days : [];
            const newDays = oldDays.filter(d => d !== dayId2Delete);
            const dayIndex2Delete = oldDays.indexOf(dayId2Delete);
            const newDayIndex2Select = !dayIndex2Delete ? 0 : dayIndex2Delete - 1;
            const newDayId2Select = newDays[newDayIndex2Select];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [state.selectedWorkoutId]: {
                        ...state.byId[state.selectedWorkoutId],
                        days: newDays,
                        selectedWorkoutDayId: newDayId2Select,
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.AddWorkoutDaySuccess: {
            const oldDays = state.byId[action.payload.workoutId].days;
            const newDays = [...oldDays];
            newDays.splice(action.payload.index2AddFrom + 1, 0, action.payload.day.id);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.workoutId]: {
                        ...state.byId[action.payload.workoutId],
                        days: newDays,
                        selectedWorkoutDayId: action.payload.day.id,
                    }
                },
            };
        }
        case WorkoutDaysActionsTypes.MoveWorkoutDaySuccess: {
            const newDays = [...state.byId[state.selectedWorkoutId].days];
            const idfDay2Move = state.byId[state.selectedWorkoutId].selectedWorkoutDayId ||
                state.byId[state.selectedWorkoutId].days[0];
            const indexOfDay2Move = newDays.indexOf(idfDay2Move);
            const offset = action.payload.direction === Direction.Forward ? 1 : -1;
            moveItemInArray(newDays, indexOfDay2Move, offset);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [state.selectedWorkoutId]: {
                        ...state.byId[state.selectedWorkoutId],
                        days: newDays,
                    }
                }
            };
        }
        case WorkoutsActionsTypes.UpdateWorkout: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.workout.id]: action.payload.workout,
                },
            };
        }
        case WorkoutsActionsTypes.ImportWorkoutSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...action.payload.workoutsData.workouts.byId,
                },
            };
        }
        default: {
    return state;
}
    }
};

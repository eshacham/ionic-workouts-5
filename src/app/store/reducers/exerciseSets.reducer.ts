import { initialExerciseSetsState, IExerciseSetsState } from '../state/ExerciseSets.state';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { WorkoutDaysActionsTypes, WorkoutDaysActions } from '../actions/workoutDays.actions';
import { ExerciseSetActions, ExerciseSetActionsTypes } from '../actions/exerciseSets.actions';
import { ExerciseActions, ExerciseActionsTypes } from '../actions/exercises.actions';
import { ExerciseSetBean } from 'src/app/models/ExerciseSet';
import { WorkoutsActionsTypes, WorkoutsActions } from '../actions/workouts.actions';
import { removeItemFromMap, filterMapByRecordPredicate, createMapFromBeanArray } from './utils';

export const exerciseSetsReducers = (
    state = initialExerciseSetsState,
    action: DataActions |
            ExerciseSetActions |
            ExerciseActions |
            WorkoutDaysActions |
            WorkoutsActions )
    : IExerciseSetsState => {
    switch (action.type) {
        case DataActionsTypes.GetDataSuccess: {
            return {
                ...state,
                byId: action.payload.sets.byId,
            };
        }
        case ExerciseSetActionsTypes.AddExerciseSets: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...createMapFromBeanArray<ExerciseSetBean>(action.payload.sets)
                }
            };
        }
        case ExerciseActionsTypes.DeleteExerciseInProgress: {
            const oldExes = state.byId[action.payload.setId].exercises;
            const newExes = oldExes.filter(exe => exe !== action.payload.exeId);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.setId]: {
                        ...state.byId[action.payload.setId],
                        exercises: newExes
                    }
                }
            };
        }
        case ExerciseSetActionsTypes.DeleteExerciseSet: {
            return {
                ...state,
                byId: removeItemFromMap(action.payload.setId, state)
            };
        }
        case WorkoutDaysActionsTypes.DeleteWorkoutDaySuccess: {
            const dayId = action.payload.dayId;
            return {
                ...state,
                byId: filterMapByRecordPredicate(([key, val]) => val.dayId !== dayId, state),

            };
        }
        case WorkoutsActionsTypes.DeleteWorkoutInProgress: {
            const workoutId = action.payload.id;
            return {
                ...state,
                byId: filterMapByRecordPredicate(([key, val]) => val.workoutId !== workoutId, state)
            };
        }
        case WorkoutsActionsTypes.ImportWorkoutSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...action.payload.workoutsData.sets.byId,
                },
            };
        }
        case ExerciseSetActionsTypes.SwitchExercisesInSet: {
            const oldExes = state.byId[action.payload.setId].exercises;
            const from = action.payload.lowIndex;
            const newExes = [
                ...oldExes.slice(0, from),
                oldExes[from + 1],
                oldExes[from],
                ...oldExes.slice(from + 2)
            ];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.setId]: {
                        ...state.byId[action.payload.setId],
                        exercises: newExes
                    }
                },
            };
        }
        default: {
            return state;
        }
    }
};

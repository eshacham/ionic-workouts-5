import { initialExercisesState, IExercisesState } from '../state/Exercises.state';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { ExerciseSetActionsTypes, ExerciseSetActions } from '../actions/exerciseSets.actions';
import { ExerciseActionsTypes, ExerciseActions } from '../actions/exercises.actions';
import { ExerciseBean } from 'src/app/models/Exercise';
import { Set } from 'src/app/models/Set';
import { WorkoutsActions, WorkoutsActionsTypes } from '../actions/workouts.actions';
import { WorkoutDaysActionsTypes, WorkoutDaysActions } from '../actions/workoutDays.actions';
import { createMapFromBeanArray, removeItemFromMap, filterMapByRecordPredicate } from './utils';

export function exercisesReducers (
    state = initialExercisesState,
    action: DataActions |
            ExerciseSetActions |
            ExerciseActions |
            WorkoutsActions |
            WorkoutDaysActions)
    : IExercisesState {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                byId: action.payload.exercises.byId,
            };
        }

        case ExerciseSetActionsTypes.AddExerciseSets: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...createMapFromBeanArray<ExerciseBean>(action.payload.exes)
                }
            };
        }
        case ExerciseActionsTypes.DeleteExerciseInProgress: {
            return {
                ...state,
                byId: removeItemFromMap(action.payload.exeId, state)
            };
        }
        case ExerciseActionsTypes.AddSet: {
            const exeId = action.payload.exerciseId;
            const newSet = Set.copySet(state.byId[exeId]
                .sets[action.payload.copyFromIndex]);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [exeId]: {
                        ...state.byId[exeId],
                        sets: [...state.byId[exeId].sets, newSet]
                    }
                }
            };
        }
        case ExerciseActionsTypes.DeleteSet: {
            const exeId = action.payload.exerciseId;
            const newSets = [...state.byId[exeId].sets];
            newSets.splice(action.payload.indexToDelete, 1);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [exeId]: {
                        ...state.byId[exeId],
                        sets: newSets
                    }
                }
            };
        }
        case ExerciseActionsTypes.UpdateExercise: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.exercise.id]: {
                        ...state.byId[action.payload.exercise.id],
                        ...action.payload.exercise
                    }
                }
            };
        }
        case ExerciseActionsTypes.UpdateSet: {
            const exeId = action.payload.exerciseId;
            const newSets = [...state.byId[exeId].sets];
            newSets[action.payload.setIndex] = action.payload.set;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [exeId]: {
                        ...state.byId[exeId],
                        sets: newSets
                    }
                }
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
                    ...action.payload.workoutsData.exercises.byId,
                },
            };
        }
        case WorkoutDaysActionsTypes.DeleteWorkoutDaySuccess: {
            const dayId = action.payload.dayId;
            return {
                ...state,
                byId: filterMapByRecordPredicate(([key, val]) => val.dayId !== dayId, state),
            };
        }
        default: {
            return state;
        }
    }
};

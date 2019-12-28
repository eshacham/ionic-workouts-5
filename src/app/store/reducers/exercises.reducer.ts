import { initialExercisesState, IExercisesState } from '../state/Exercises.state';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { ExerciseSetActionsTypes, ExerciseSetActions } from '../actions/exerciseSets.actions';
import { ExerciseActionsTypes, ExerciseActions } from '../actions/exercises.actions';
import { ExerciseBean } from 'src/app/models/Exercise';
import { Rep } from 'src/app/models/Rep';
import { WorkoutsActions, WorkoutsActionsTypes } from '../actions/workouts.actions';
import { WorkoutDaysActionsTypes, WorkoutDaysActions } from '../actions/workoutDays.actions';
import { createMapFromBeanArray, removeItemFromMap, filterMapByRecordPredicate } from './utils';

export const exercisesReducers = (
    state = initialExercisesState,
    action: DataActions |
            ExerciseSetActions |
            ExerciseActions |
            WorkoutsActions |
            WorkoutDaysActions)
    : IExercisesState => {
    switch (action.type) {
        case DataActionsTypes.GetDataSuccess: {
            return {
                ...state,
                byId: action.payload.exercises.byId,
            };
        }
        case ExerciseActionsTypes.ResetReps: {
            const newReps = Rep.copyRepsAndReset(state.byId[action.payload.exerciseId].reps);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.exerciseId]: {
                        ...state.byId[action.payload.exerciseId],
                        reps: newReps
                    }
                }
            };
        }
        case ExerciseActionsTypes.SetRepsActiveState: {
            const newReps = Rep.copyRepsAndSetToActive(state.byId[action.payload.exerciseId].reps, action.payload.activeIndex);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.exerciseId]: {
                        ...state.byId[action.payload.exerciseId],
                        reps: newReps
                    }
                }
            };
        }
        case ExerciseActionsTypes.SetRepsCompleteState: {
            const newReps = Rep.copyRepsAndSetToComplete(state.byId[action.payload.exerciseId].reps, action.payload.completeIndex);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.exerciseId]: {
                        ...state.byId[action.payload.exerciseId],
                        reps: newReps
                    }
                }
            };
        }
        case ExerciseActionsTypes.SetRepsIncompleteState: {
            const newReps = Rep.copyRepsAndSetToIncomplete(state.byId[action.payload.exerciseId].reps, action.payload.incompleteIndex);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.exerciseId]: {
                        ...state.byId[action.payload.exerciseId],
                        reps: newReps
                    }
                }
            };
        }
        case ExerciseActionsTypes.SetInactiveReps: {
            const newReps = Rep.copyRepsAndSetToInactive(state.byId[action.payload.exerciseId].reps);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.exerciseId]: {
                        ...state.byId[action.payload.exerciseId],
                        reps: newReps
                    }
                }
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
        case ExerciseActionsTypes.AddRep: {
            const exeId = action.payload.exerciseId;
            const newRep = Rep.copyRep(state.byId[exeId]
                .reps[action.payload.copyFromIndex]);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [exeId]: {
                        ...state.byId[exeId],
                        reps: [...state.byId[exeId].reps, newRep]
                    }
                }
            };
        }
        case ExerciseActionsTypes.DeleteRep: {
            const exeId = action.payload.exerciseId;
            const newReps = [...state.byId[exeId].reps];
            newReps.splice(action.payload.indexToDelete, 1);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [exeId]: {
                        ...state.byId[exeId],
                        reps: newReps
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
        case ExerciseActionsTypes.UpdateRep: {
            const exeId = action.payload.exerciseId;
            const newReps = [...state.byId[exeId].reps];
            newReps[action.payload.repIndex] = action.payload.rep;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [exeId]: {
                        ...state.byId[exeId],
                        reps: newReps
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

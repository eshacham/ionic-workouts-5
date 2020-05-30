import { initialExercisesMediaState, IExercisesMediaState } from '../state/ExercisesMedia.state';
import { DataActionsTypes, DataActions } from '../actions/data.actions';
import { MusclesFilterActionsTypes, MusclesFilterActions } from '../actions/musclesFilter.actions';
import { ExerciseMediaActionsTypes, ExerciseMediaActions } from '../actions/exercisesMedia.actions';
import { ExerciseSetActions } from '../actions/exerciseSets.actions';
import { removeItemFromMap } from './utils';
import { WorkoutsActions, WorkoutsActionsTypes } from '../actions/workouts.actions';

export function exercisesMediaReducers (
    state = initialExercisesMediaState,
    action:
        DataActions |
        MusclesFilterActions |
        ExerciseMediaActions |
        ExerciseSetActions |
        WorkoutsActions)
    : IExercisesMediaState {
    switch (action.type) {
        case DataActionsTypes.LoadDataSuccess: {
            return {
                ...state,
                byId: action.payload.media ? action.payload.media.byId : null,
            };
        }
        case MusclesFilterActionsTypes.AddExerciseMuscleFilterSuccess: {
            const mediaId = action.payload.mediaId;
            if (mediaId) {
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [mediaId]: {
                            ...state.byId[mediaId],
                            muscles: [...state.byId[mediaId].muscles, action.payload.muscle]
                        }
                    }
                };
            } else {
                return {
                    ...state,
                }
            }
        }
        case MusclesFilterActionsTypes.DeleteExerciseMuscleFilterSuccess: {
            const mediaId = action.payload.mediaId;
            if (mediaId) {
                const oldMuscles = state.byId[mediaId].muscles;
                const newMuscles = oldMuscles.filter(m => m !== action.payload.muscle);
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [mediaId]: {
                            ...state.byId[mediaId],
                            muscles: newMuscles
                        }
                    }
                };
            } else {
                return {
                    ...state,
                }
            }
        }
        case ExerciseMediaActionsTypes.UpdateExerciseMediaSuccess: {
            const mediaId = action.payload.id;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [mediaId]: {
                        ...state.byId[mediaId],
                        name: action.payload.name || state.byId[mediaId].name,
                        description: action.payload.description || state.byId[mediaId].description,
                        images: action.payload.images || state.byId[mediaId].images,
                    }
                }
            };
        }
        case ExerciseMediaActionsTypes.DeleteExerciseMediaSuccess: {
            return {
                ...state,
                byId: removeItemFromMap(action.payload.imageId, state)
            };
        }
        case ExerciseMediaActionsTypes.AddExerciseMediaSuccess: {
            const newId = action.payload.exerciseMedia.id;
            return {
                ...state,
                byId: {
                    [newId]: action.payload.exerciseMedia,
                    ...state.byId,
                }
            };
        }
        case WorkoutsActionsTypes.ImportWorkoutSuccess: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...action.payload.imagesData.media.byId,
                },
            };
        }
        default: {
            return state;
        }
    }
};

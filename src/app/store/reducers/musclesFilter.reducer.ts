import {MusclesFilterActions, MusclesFilterActionsTypes} from '../actions/musclesFilter.actions';
import { IMusclesFilterState, initialMusclesFilterState } from '../state/musclesFilter.state';

export const musclesFilterReducers = (state = initialMusclesFilterState, action: MusclesFilterActions)
: IMusclesFilterState => {
    switch (action.type) {
        case MusclesFilterActionsTypes.SetExerciseMuscleFilter: {
            return {
                ...state,
                exerciseMusclesFilter: action.muscles
            };
        }
        case MusclesFilterActionsTypes.AddExerciseMuscleFilterSuccess: {
            return {
                ...state,
                exerciseMusclesFilter: [
                    ...state.exerciseMusclesFilter,
                    action.payload.muscle
                ]
            };
        }
        case MusclesFilterActionsTypes.AddLibraryMuscleFilter: {
            return {
                ...state,
                libraryMusclesFilter: [
                    ...state.libraryMusclesFilter,
                    action.muscle
                ]
            };
        }
        case MusclesFilterActionsTypes.DeleteExerciseMuscleFilterSuccess: {
            return {
                ...state,
                exerciseMusclesFilter: state.exerciseMusclesFilter
                .filter(m => m !== action.payload.muscle)
            };
        }
        case MusclesFilterActionsTypes.DeleteLibraryMuscleFilter: {
            return {
                ...state,
                libraryMusclesFilter: state.libraryMusclesFilter
                .filter(m => m !== action.muscle)
            };
        }
        default: {
            return state;
        }
    }
};

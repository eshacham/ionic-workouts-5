import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IExercisesState } from '../state/Exercises.state';

export const exercisesState = (state: IAppState): IExercisesState => state.exercises;

export const getMediaIdsByDay = (dayId: string) => createSelector(
    exercisesState,
    (exercises: IExercisesState) => {
        const exesArray = Object.entries(exercises.byId);
        const mediaIds = exesArray
                .filter(([_, exercise]) => exercise.dayId === dayId)
                .map(([_, exercise]) => exercise.mediaId);
        return mediaIds;
    }
);
export const getMediaIdsByWorkout = (workoutId: string) => createSelector(
    exercisesState,
    (exercises: IExercisesState) => {
        const exesArray = Object.entries(exercises.byId);
        const mediaIds = exesArray
                .filter(([_, exercise]) => exercise.workoutId === workoutId)
                .map(([_, exercise]) => exercise.mediaId);
        return mediaIds;
    }
);
export const getExerciseMediaUsage = (mediaId: string) => createSelector(
    exercisesState,
    (exercises: IExercisesState) => {
        const exesArray = Object.entries(exercises.byId);
        const usage = exesArray
                .filter(([_, exercise]) => exercise.mediaId === mediaId)
                .map(([_, exercise]) => ({ workoutId: exercise.workoutId, dayId: exercise.dayId }));
        return usage;
    }
);

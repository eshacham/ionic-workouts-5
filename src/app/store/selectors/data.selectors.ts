import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IDataState, IRunningWorkoutDayState } from '../state/data.state';
import { IWorkoutsState } from '../state/workouts.state';
import { IWorkoutDaysState } from '../state/workoutDays.state';
import { IExerciseSetsState } from '../state/ExerciseSets.state';
import { IExercisesState } from '../state/Exercises.state';
import { IExercisesMediaState } from '../state/ExercisesMedia.state';
import { workoutsState } from './workouts.selectors';
import { exercisesState } from './exercises.selectors';
import { daysState } from './workoutDays.selectors';
import { setsState } from './exerciseSets.selectors';
import { mediaState } from './ExercisesMedia.selectors';
import { Version } from 'src/app/models/Version';
import { TermsOfUse } from 'src/app/models/TermsOfUse';

const dataState = (state: IAppState) => state.data;

export const getWorkoutsData = createSelector(
    workoutsState,
    daysState,
    setsState,
    exercisesState,
    (workouts: IWorkoutsState,
     days: IWorkoutDaysState,
     sets: IExerciseSetsState,
     exercises: IExercisesState) => ({
            workouts,
            days,
            sets,
            exercises,
        })
);
export const getImagesData = createSelector(
    mediaState,
    (media: IExercisesMediaState) => ({ media })
);

export const getHasDataBeenReset = createSelector(
    dataState,
    (state: IDataState) => state.hasDataBeenReset
);

export const getHasDataBeenLoaded = createSelector(
    dataState,
    (state: IDataState) => state.hasDataBeenLoaded
);

export const getWorkoutExportInProgress = createSelector(
    dataState,
    (state: IDataState) => state.workoutExportInProgress
);

export const getWorkoutImportInProgress = createSelector(
    dataState,
    (state: IDataState) => state.workoutImportInProgress
);

export const getAuthActionInProgress = createSelector(
    dataState,
    (state: IDataState) => state.authActionInProgress
);

export const getError = createSelector(
    dataState,
    (state: IDataState) => state.error
);

export const getTheme = createSelector(
    dataState,
    (state: IDataState) => state.theme
);

export const getSignedInUser = createSelector(
    dataState,
    (state: IDataState) => state.signedInUser
);

export const getReleaseNotesAndTermsOfUse = createSelector(
    dataState,
    (state: IDataState): {
        releaseNotes: Version[],
        termsOfUse: TermsOfUse } =>
        ({ releaseNotes: Object.values(state.releaseNotes),
            termsOfUse: state.termsOfUse,
        })
);
export const getIsOnline = createSelector(
    dataState,
    (state: IDataState): boolean => state.isOnline
);
export const getRunningWorkoutDayState = createSelector(
    dataState,
    (state: IDataState): IRunningWorkoutDayState => state.runningWorkoutDayState
);

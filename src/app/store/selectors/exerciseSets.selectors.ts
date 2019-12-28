import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IExerciseSetsState } from '../state/ExerciseSets.state';
import { IExercisesState } from '../state/Exercises.state';
import { IExercisesMediaState } from '../state/ExercisesMedia.state';
import { ExerciseSetBean } from 'src/app/models/ExerciseSet';
import { ExerciseBean } from 'src/app/models/Exercise';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { exercisesState } from './exercises.selectors';
import { mediaState } from './ExercisesMedia.selectors';

export const setsState = (state: IAppState): IExerciseSetsState => state.sets;

export const getExerciseSet = (id: string) => createSelector(
    setsState,
    exercisesState,
    mediaState,
    (exerciseSets: IExerciseSetsState,
     exercises: IExercisesState,
     media: IExercisesMediaState) => {
        let set: ExerciseSetBean;
        let exes: ExerciseBean[] = [];
        let medias: ExerciseMediaBean[] = [];
        set = exerciseSets.byId[id];
        if (set) {
            const exeIds = set.exercises;
            exes = exeIds.map(exeId => exercises.byId[exeId]);
            const mediaIds = exes.map(e => e ? e.mediaId : null);
            medias = mediaIds.map(mediaId => media && media.byId ? media.byId[mediaId] : null);
            Object.freeze(exes);
            Object.freeze(medias);
        }
        return { set, exercises: exes, media: medias };
    }
);

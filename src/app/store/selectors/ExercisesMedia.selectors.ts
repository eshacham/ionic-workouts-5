import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IExercisesMediaState } from '../state/ExercisesMedia.state';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';

export const mediaState = (state: IAppState) => state.media;

export const getExercisesMedias = createSelector(
  mediaState,
    (mediaMap: IExercisesMediaState): ExerciseMediaBean[] => {
        return Object.keys(mediaMap.byId)
        .map(id => mediaMap.byId[id]);
    }
);

export const getExerciseMedia = (id: string) => createSelector(
  mediaState,
  (mediaMap: IExercisesMediaState): ExerciseMediaBean => {
      return mediaMap.byId[id];
  }
);

import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IExercisesMediaState } from '../state/ExercisesMedia.state';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';

export const mediaState = (state: IAppState) => state.media;

export const getExercisesMedias = createSelector(
  mediaState,
  (mediaStateData: IExercisesMediaState): ExerciseMediaBean[] => {
    const imageKeys = Object.keys(mediaStateData.byId);
    const images = imageKeys.map(id => mediaStateData.byId[id]);
    return images;
  }
);

export const getExerciseMedia = (id: string) => createSelector(
  mediaState,
  (mediaMap: IExercisesMediaState): ExerciseMediaBean => {
    return mediaMap.byId[id];
  }
);

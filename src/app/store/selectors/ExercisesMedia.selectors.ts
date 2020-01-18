import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IExercisesMediaState } from '../state/ExercisesMedia.state';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';

export const mediaState = (state: IAppState) => state.media;

export const getExercisesMedias = createSelector(
  mediaState,
  (mediaStateData: IExercisesMediaState): { images: ExerciseMediaBean[], scrollTo: number } => {
    return {
      images: Object.keys(mediaStateData.byId)
        .map(id => mediaStateData.byId[id]),
      scrollTo: mediaStateData.scrollToExerciseMediaIndex
    };
  }
);

export const getExerciseMedia = (id: string) => createSelector(
  mediaState,
  (mediaMap: IExercisesMediaState): ExerciseMediaBean => {
    return mediaMap.byId[id];
  }
);

import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IMusclesFilterState } from '../state/musclesFilter.state';

export const musclesFilterState = (state: IAppState) => state.musclesFilter;

export const getExerciseMusclesFilter = createSelector(
  musclesFilterState,
  (state: IMusclesFilterState) => state.exerciseMusclesFilter
);
export const getLibraryMusclesFilter = createSelector(
  musclesFilterState,
  (state: IMusclesFilterState) => state.libraryMusclesFilter
);

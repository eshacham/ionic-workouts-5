import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IWorkoutDaysState } from '../state/workoutDays.state';

export const daysState = (state: IAppState): IWorkoutDaysState => state.days;

export const getWorkoutDay = (id: string) => createSelector(
  daysState,
  (workoutDays: IWorkoutDaysState) => {
      return workoutDays.byId[id];
  }
);


import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IWorkoutDaysState } from '../state/workoutDays.state';
import { DisplayMode } from 'src/app/models/enums';

export const daysState = (state: IAppState): IWorkoutDaysState => state.days;

export const getWorkoutDay = (id: string) => createSelector(
  daysState,
  (workoutDays: IWorkoutDaysState) => {
      return workoutDays.byId[id];
  }
);

// export const getRunningDay = createSelector(
//   daysState,
//   (workoutDays: IWorkoutDaysState) => {
//     const id = Object.keys(workoutDays.byId).find(dayId => {
//       return workoutDays.byId[dayId].displayMode === DisplayMode.Workout;
//     });
//     return id;
//   }
// );

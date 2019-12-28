import { IDataState, initialDataState } from './data.state';
import { IMusclesFilterState, initialMusclesFilterState } from './musclesFilter.state';
import { IWorkoutsState, initialWorkoutsState } from './workouts.state';
import { IWorkoutDaysState, initialWorkoutDaysState } from './workoutDays.state';
import { IExerciseSetsState, initialExerciseSetsState } from './ExerciseSets.state';
import { initialExercisesState, IExercisesState } from './Exercises.state';
import { initialExercisesMediaState, IExercisesMediaState } from './ExercisesMedia.state';

export interface IAppState {
  data: IDataState;
  musclesFilter: IMusclesFilterState;
  workouts: IWorkoutsState;
  days: IWorkoutDaysState;
  sets: IExerciseSetsState;
  exercises: IExercisesState;
  media: IExercisesMediaState;
}

export const initialAppState: IAppState = {
  data: initialDataState,
  musclesFilter: initialMusclesFilterState,
  workouts: initialWorkoutsState,
  days: initialWorkoutDaysState,
  sets: initialExerciseSetsState,
  exercises: initialExercisesState,
  media: initialExercisesMediaState,
};

export const getInitialState = (): IAppState => initialAppState;

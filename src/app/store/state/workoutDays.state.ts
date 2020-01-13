import { WorkoutDayBean } from 'src/app/models/WorkoutDay';
import { IState } from './generics';

export interface IWorkoutDaysState extends IState<WorkoutDayBean> {
    // deleteSelectedWorkoutDay?: string;
    // lastAddedExerciseSetId: string;
}

export const initialWorkoutDaysState: IWorkoutDaysState = {
    // deleteSelectedWorkoutDay: undefined,
    // lastAddedExerciseSetId: undefined,
    byId: {},
};

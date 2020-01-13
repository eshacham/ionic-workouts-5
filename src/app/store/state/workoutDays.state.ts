import { WorkoutDayBean } from 'src/app/models/WorkoutDay';
import { IState } from './generics';

export interface IWorkoutDaysState extends IState<WorkoutDayBean> {
}

export const initialWorkoutDaysState: IWorkoutDaysState = {
    byId: {},
};

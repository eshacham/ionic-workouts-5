import { WorkoutBean } from 'src/app/models/Workout';
import { IState } from './generics';

export interface IWorkoutsState extends IState<WorkoutBean> {
    selectedWorkoutId: string;
}

export const initialWorkoutsState: IWorkoutsState = {
    selectedWorkoutId: undefined,
    byId: {},
};

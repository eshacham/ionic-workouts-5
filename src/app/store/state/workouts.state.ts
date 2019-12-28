import { WorkoutBean } from 'src/app/models/Workout';
import { IState } from './generics';

export interface IWorkoutsState extends IState<WorkoutBean> {
    selectedWorkoutId: string;
    workoutId2Delete?: string;
}

export const initialWorkoutsState: IWorkoutsState = {
    selectedWorkoutId: undefined,
    workoutId2Delete: undefined,
    byId: {},
};

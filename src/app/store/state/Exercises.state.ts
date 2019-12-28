import { ExerciseBean } from 'src/app/models/Exercise';
import { IState } from './generics';

export interface IExercisesState extends IState<ExerciseBean> {
}

export const initialExercisesState: IExercisesState = {
    byId: {},
};

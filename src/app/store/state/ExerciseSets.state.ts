import { ExerciseSetBean } from 'src/app/models/ExerciseSet';
import { IState } from './generics';

export interface IExerciseSetsState extends IState<ExerciseSetBean> {
}

export const initialExerciseSetsState: IExerciseSetsState = {
    byId: {},
};

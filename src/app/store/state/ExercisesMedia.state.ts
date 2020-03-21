import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { IState } from './generics';

export interface IExercisesMediaState extends IState<ExerciseMediaBean> {
}

export const initialExercisesMediaState: IExercisesMediaState = {
    byId: {},
};

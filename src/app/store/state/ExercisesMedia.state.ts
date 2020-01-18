import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { IState } from './generics';

export interface IExercisesMediaState extends IState<ExerciseMediaBean> {
    scrollToExerciseMediaIndex?: number;

}

export const initialExercisesMediaState: IExercisesMediaState = {
    byId: {},
};

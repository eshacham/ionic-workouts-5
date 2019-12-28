import { Muscles } from '../../models/enums';

export interface IMusclesFilterState {
    exerciseMusclesFilter: Muscles[];
    libraryMusclesFilter: Muscles[];
}
export const initialMusclesFilterState: IMusclesFilterState = {
    exerciseMusclesFilter: [],
    libraryMusclesFilter: []
};

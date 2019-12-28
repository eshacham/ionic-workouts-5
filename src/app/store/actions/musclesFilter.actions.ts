import { Action } from '@ngrx/store';
import { Muscles } from '../../models/enums';

export enum MusclesFilterActionsTypes {
    SetExerciseMuscleFilter = '[Muscle Filter] Set exercise\'s filter',
    AddExerciseMuscleFilter = '[Muscle Filter] Add muscle to exercise',
    AddExerciseMuscleFilterSuccess = '[Muscle Filter] Muscle filter was added to exercise',
    DeleteExerciseMuscleFilter = '[Muscle Filter] Delete muscle from exercise',
    DeleteExerciseMuscleFilterSuccess = '[Muscle Filter] Muscle filter was deleted from exercise',
    AddLibraryMuscleFilter = '[Muscle Filter] Add muscle to library',
    DeleteLibraryMuscleFilter = '[Muscle Filter] Delete muscle from library',
}

export class SetExerciseMuscleFilter implements Action {
    readonly type = MusclesFilterActionsTypes.SetExerciseMuscleFilter;
    constructor (public muscles: Muscles[]) {}
}
export class AddExerciseMuscleFilter implements Action {
    readonly type = MusclesFilterActionsTypes.AddExerciseMuscleFilter;
    constructor (public payload: { muscle: Muscles, mediaId: string}) {}
}
export class AddExerciseMuscleFilterSuccess implements Action {
    readonly type = MusclesFilterActionsTypes.AddExerciseMuscleFilterSuccess;
    constructor (public payload: { muscle: Muscles, mediaId: string}) {}
}
export class DeleteExerciseMuscleFilter implements Action {
    readonly type = MusclesFilterActionsTypes.DeleteExerciseMuscleFilter;
    constructor (public payload: { muscle: Muscles, mediaId: string}) {}
}
export class DeleteExerciseMuscleFilterSuccess implements Action {
    readonly type = MusclesFilterActionsTypes.DeleteExerciseMuscleFilterSuccess;
    constructor (public payload: { muscle: Muscles, mediaId: string}) {}
}

export class AddLibraryMuscleFilter implements Action {
    readonly type = MusclesFilterActionsTypes.AddLibraryMuscleFilter;
    constructor (public muscle: Muscles) {}
}
export class DeleteLibraryMuscleFilter implements Action {
    readonly type = MusclesFilterActionsTypes.DeleteLibraryMuscleFilter;
    constructor (public muscle: Muscles) {}
}

export type MusclesFilterActions =
SetExerciseMuscleFilter |
AddExerciseMuscleFilter |
AddExerciseMuscleFilterSuccess |
DeleteExerciseMuscleFilter |
DeleteExerciseMuscleFilterSuccess |
AddLibraryMuscleFilter |
DeleteLibraryMuscleFilter
;

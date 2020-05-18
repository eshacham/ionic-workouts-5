import { Action } from '@ngrx/store';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { IAddImageOptions, IRemoveImageOptions } from 'src/app/models/interfaces';

export enum ExerciseMediaActionsTypes {
    AddExerciseMedia = '[ExerciseMedia] Add a new exercise media',
    AddExerciseMediaSuccess = '[ExerciseMedia] Eexercise media has been added',
    UpdateExerciseMedia = '[ExerciseMedia] Update exercise media',
    UpdateExerciseMediaSuccess = '[ExerciseMedia] Exercise media has been updated',
    DeleteExerciseMedia = '[ExerciseMedia] Delete exercise media',
    DeleteExerciseMediaSuccess = '[ExerciseMedia] Exercise media has been deleted',
    // ScrollToExerciseMedia = '[ExerciseMedia] Scroll to Exercise media',
    // ResetScrollToExerciseMedia = '[ExerciseMedia] Reset the scroll to Exercise media',
    InsertImageToExerciseMedia = '[ExerciseMedia] Insert a an image to an exercise media',
    RemoveImageFromExerciseMedia = '[ExerciseMedia] Remove a an image from an exercise media',
}

export class AddExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.AddExerciseMedia;
    constructor(public payload: IAddImageOptions) { }
}
export class InsertImageToExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.InsertImageToExerciseMedia;
    constructor(public payload: IAddImageOptions) { }
}
export class RemoveImageFromExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.RemoveImageFromExerciseMedia;
    constructor(public payload: IRemoveImageOptions) { }
}
export class AddExerciseMediaSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.AddExerciseMediaSuccess;
    constructor(public payload: {
        exerciseMedia: ExerciseMediaBean,
    }) { }
}
export class UpdateExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.UpdateExerciseMedia;
    constructor(public payload: {
        id: string,
        name?: string,
        images?: string[],
    }) { }
}
export class UpdateExerciseMediaSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.UpdateExerciseMediaSuccess;
    constructor(public payload: {
        id: string,
        name?: string,
        images?: string[],
    }) { }
}

export class DeleteExerciseMedia implements Action {
    readonly type = ExerciseMediaActionsTypes.DeleteExerciseMedia;
    constructor(public payload: {
        image: ExerciseMediaBean,
    }) { }
}
export class DeleteExerciseMediaSuccess implements Action {
    readonly type = ExerciseMediaActionsTypes.DeleteExerciseMediaSuccess;
    constructor(public payload: {
        imageId: string,
    }) { }
}
// export class ScrollToExerciseMedia implements Action {
//     readonly type = ExerciseMediaActionsTypes.ScrollToExerciseMedia;
//     constructor(public payload: {
//         imageId: string,
//     }) { }
// }
// export class ResetScrollToExerciseMedia implements Action {
//     readonly type = ExerciseMediaActionsTypes.ResetScrollToExerciseMedia;
//     constructor() { }
// }

export type ExerciseMediaActions =
    AddExerciseMedia |
    AddExerciseMediaSuccess |
    UpdateExerciseMedia |
    UpdateExerciseMediaSuccess |
    DeleteExerciseMedia |
    DeleteExerciseMediaSuccess |
    // ScrollToExerciseMedia |
    // ResetScrollToExerciseMedia |
    InsertImageToExerciseMedia |
    RemoveImageFromExerciseMedia
    ;

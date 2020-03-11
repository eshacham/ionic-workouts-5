import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, from } from 'rxjs';
import { switchMap, map, withLatestFrom, mergeMap, catchError } from 'rxjs/operators';
import { IAppState } from '../state/app.state';
import {
    LoadData,
    DataActionsTypes,
    LoadDataSuccess,
    UpdateWorkouts,
    WorkoutsSavedSuccess,
    UpdateImages,
    ImagesSavedSuccess,
    LoadDataError,
    WorkoutsSavedError,
    SetTheme,
    ThemeSavedSuccess,
    ThemeSavedError,
    LoadTheme,
    LoadThemeSuccess,
    ResetData,
    ResetDataSuccess,
    ResetDataError,
} from '../actions/data.actions';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AllDataMaps, WorkoutsDataMaps, MediaDataMaps } from 'src/app/models/interfaces';
import { getWorkoutsData, getImagesData } from '../selectors/data.selectors';
import {
    ExerciseMediaActionsTypes,
    AddExerciseMedia,
    AddExerciseMediaSuccess,
    DeleteExerciseMedia,
    DeleteExerciseMediaSuccess,
    UpdateExerciseMedia,
    UpdateExerciseMediaSuccess,
} from '../actions/exercisesMedia.actions';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { ExerciseActionsTypes, DeleteExercise, DeleteExerciseInProgress } from '../actions/exercises.actions';
import { DeleteExerciseSet } from '../actions/exerciseSets.actions';
import {
    DeleteWorkout,
    WorkoutsActionsTypes,
    DeleteWorkoutInProgress,
    AddWorkout,
    AddWorkoutSuccess,
    ExportWorkout,
    ExportWorkoutSuccess,
    ImportWorkout,
    ImportWorkoutSuccess
} from '../actions/workouts.actions';
import { getMediaIdsByWorkout, getMediaIdsByDay } from '../selectors/exercises.selectors';
import {
    MusclesFilterActionsTypes,
    AddExerciseMuscleFilter,
    AddExerciseMuscleFilterSuccess,
    DeleteExerciseMuscleFilter,
    DeleteExerciseMuscleFilterSuccess
} from '../actions/musclesFilter.actions';
import {
    WorkoutDaysActionsTypes,
    MoveWorkoutDay,
    MoveWorkoutDaySuccess,
    AddWorkoutDay,
    AddWorkoutDaySuccess,
    DeleteWorkoutDay,
    DeleteWorkoutDaySuccess,
    ChangeDisplayModeSuccess,
    ChangeDisplayMode
} from '../actions/workoutDays.actions';
import { Logger, LoggingService } from 'ionic-logging-service';

@Injectable()
export class DataEffects {
    private logger: Logger;

    constructor(
        loggingService: LoggingService,
        private dataService: DataServiceProvider,
        private actions$: Actions,
        private store: Store<IAppState>
    ) {
        this.logger = loggingService.getLogger('App.DataEffects');
    }

    @Effect()
    loadAllData$ = this.actions$.pipe(
        ofType(DataActionsTypes.LoadData),
        mergeMap((action: LoadData) => from(this.dataService.getAllData()).pipe(
            map((allData: AllDataMaps) => (new LoadDataSuccess(allData))),
            catchError(err => {
                this.logger.error('getAllData', err);
                return of(new LoadDataError(err.message));
            })
        ))
    );

    @Effect()
    loadThemeData$ = this.actions$.pipe(
        ofType(DataActionsTypes.LoadTheme),
        mergeMap((action: LoadTheme) => from(this.dataService.getThemeData()).pipe(
            map((theme: string) => (new LoadThemeSuccess(theme))),
            catchError(err => {
                this.logger.error('getAllData', err);
                return of(new LoadDataError(err.message));
            })
        ))
    );

    @Effect()
    setTheme$ = this.actions$.pipe(
        ofType(DataActionsTypes.SetTheme),
        mergeMap((action: SetTheme) => from(this.dataService.saveTheme(action.payload)).pipe(
            map(() => (new ThemeSavedSuccess(action.payload))),
            catchError(err => {
                this.logger.error('saveTheme', err);
                return of(new ThemeSavedError(err.message));
            })
        ))
    );

    @Effect()
    resetData$ = this.actions$.pipe(
        ofType(DataActionsTypes.ResetData),
        mergeMap((action: ResetData) => from(this.dataService.resetData()).pipe(
            map(() => (new ResetDataSuccess())),
            catchError(err => {
                this.logger.error('resetData', err);
                return of(new ResetDataError(err.message));
            })
        ))
    );

    @Effect()
    saveWorkouts$ = this.actions$.pipe(
        ofType(DataActionsTypes.UpdateWorkouts),
        map((action: UpdateWorkouts) => action),
        withLatestFrom(this.store.pipe(select(getWorkoutsData))),
        mergeMap(([action, workoutsData]) => from(this.dataService.saveWorkouts(workoutsData)).pipe(
            map(() => (new WorkoutsSavedSuccess())),
            catchError(err => {
                this.logger.error('saveWorkouts', err);
                return of(new WorkoutsSavedError(err.message));
            })
        ))
    );

    @Effect()
    saveImages$ = this.actions$.pipe(
        ofType(DataActionsTypes.UpdateImages),
        map((action: UpdateImages) => action),
        withLatestFrom(this.store.pipe(select(getImagesData))),
        mergeMap(([action, imagessData]) => from(this.dataService.saveImages(imagessData)).pipe(
            map(() => (new ImagesSavedSuccess())),
            catchError(err => {
                this.logger.error('saveImages', err);
                return of(new WorkoutsSavedError(err.message));
            })
        ))
    );



    @Effect()
    exportWorkout$ = this.actions$.pipe(
        ofType(WorkoutsActionsTypes.ExportWorkout),
        // tslint:disable-next-line: max-line-length
        mergeMap((action: ExportWorkout) => from(this.dataService.exportWorkout(action.payload.workoutId, action.payload.signedInUser)).pipe(
            map((exportId: string) => (new ExportWorkoutSuccess())),
            catchError(err => {
                this.logger.error('exportWorkout', err);
                return of(new LoadDataError(err.message));
            })
        ))
    );

    @Effect()
    importWorkout$ = this.actions$.pipe(
        ofType(WorkoutsActionsTypes.ImportWorkout),
        mergeMap((action: ImportWorkout) => from(this.dataService.importWorkout(action.payload.workoutId, action.payload.ownerUserId)).pipe(
            map((data: { workoutsData: WorkoutsDataMaps, imagesData: MediaDataMaps }) => (new ImportWorkoutSuccess(data))),
            catchError(err => {
                this.logger.error('importWorkout', err);
                return of(new LoadDataError(err.message));
            })
        ))
    );

    @Effect()
    addNewImage$ = this.actions$.pipe(
        ofType(ExerciseMediaActionsTypes.AddExerciseMedia),
        mergeMap((action: AddExerciseMedia) => from(this.dataService.addImage(
            action.payload.origPath, action.payload.origName, action.payload.newName)).pipe(
                switchMap((newImage: ExerciseMediaBean) => [
                    (new AddExerciseMediaSuccess({ exerciseMedia: newImage })),
                    (new UpdateImages())]),
                catchError(err => {
                    this.logger.error('addNewImage', err);
                    return of(new LoadDataError(err.message));
                })
            ))
    );

    @Effect()
    deleteImage$ = this.actions$.pipe(
        ofType(ExerciseMediaActionsTypes.DeleteExerciseMedia),
        mergeMap((action: DeleteExerciseMedia) => from(this.dataService.deleteMedia(
            action.payload.image)).pipe(
                switchMap((imageId: string) => [
                    (new DeleteExerciseMediaSuccess({ imageId })),
                    (new UpdateImages())
                ]),
                catchError(err => {
                    this.logger.error('deleteImage', err);
                    return of(new LoadDataError(err.message));
                })
            ))
    );

    @Effect()
    updateImage$ = this.actions$.pipe(
        ofType(ExerciseMediaActionsTypes.UpdateExerciseMedia),
        mergeMap((action: UpdateExerciseMedia) => ([
            new UpdateExerciseMediaSuccess(action.payload),
            new UpdateImages()
        ])),
        catchError(err => {
            this.logger.error('updateImage', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    deleteExercise$ = this.actions$.pipe(
        ofType(ExerciseActionsTypes.DeleteExercise),
        mergeMap((action: DeleteExercise) => {
            const actions: any[] = [
                new DeleteExerciseInProgress(action.payload)
            ];
            if (action.payload.deleteSet) {
                actions.push(new DeleteExerciseSet({
                    dayId: action.payload.dayId,
                    setId: action.payload.setId
                }));
            }
            return actions;
        }),
        catchError(err => {
            this.logger.error('deleteExercise', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    deleteWorkout$ = this.actions$.pipe(
        ofType(WorkoutsActionsTypes.DeleteWorkout),
        map((action: DeleteWorkout) => action.payload),
        mergeMap((payload: { id: string, days: string[] }) =>
            of(payload).pipe(
                withLatestFrom(this.store.pipe(select(getMediaIdsByWorkout(payload.id)))),
            ),
        ),
        switchMap(([payload, mediaIds]) => {
            const actions: any[] = [];
            actions.push(new DeleteWorkoutInProgress({
                id: payload.id,
                days: payload.days
            }));
            actions.push(new UpdateWorkouts());
            return actions;
        }),
        catchError(err => {
            this.logger.error('deleteWorkout', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    deleteWorkoutDay$ = this.actions$.pipe(
        ofType(WorkoutDaysActionsTypes.DeleteWorkoutDay),
        map((action: DeleteWorkoutDay) => action.payload),
        mergeMap((payload: { dayId: string }) =>
            of(payload).pipe(
                withLatestFrom(this.store.pipe(select(getMediaIdsByDay(payload.dayId)))),
            ),
        ),
        switchMap(([payload, mediaIds]) => {
            const actions: any[] = [];
            actions.push(new DeleteWorkoutDaySuccess(payload));
            actions.push(new UpdateWorkouts());
            return actions;
        }),
        catchError(err => {
            this.logger.error('deleteWorkoutDay', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    addExerciseMuscleFilter$ = this.actions$.pipe(
        ofType(MusclesFilterActionsTypes.AddExerciseMuscleFilter),
        mergeMap((action: AddExerciseMuscleFilter) => ([
            new AddExerciseMuscleFilterSuccess(action.payload),
            new UpdateImages()
        ])),
        catchError(err => {
            this.logger.error('addExerciseMuscleFilter', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    deleteExerciseMuscleFilter$ = this.actions$.pipe(
        ofType(MusclesFilterActionsTypes.DeleteExerciseMuscleFilter),
        mergeMap((action: DeleteExerciseMuscleFilter) => ([
            new DeleteExerciseMuscleFilterSuccess(action.payload),
            new UpdateImages()
        ])),
        catchError(err => {
            this.logger.error('deleteExerciseMuscleFilter', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    moveWorkoutDay$ = this.actions$.pipe(
        ofType(WorkoutDaysActionsTypes.MoveWorkoutDay),
        mergeMap((action: MoveWorkoutDay) => ([
            new MoveWorkoutDaySuccess(action.payload),
            new UpdateWorkouts()
        ])),
        catchError(err => {
            this.logger.error('moveWorkoutDay', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    addWorkoutDay$ = this.actions$.pipe(
        ofType(WorkoutDaysActionsTypes.AddWorkoutDay),
        mergeMap((action: AddWorkoutDay) => ([
            new AddWorkoutDaySuccess(action.payload),
            new UpdateWorkouts()
        ])),
        catchError(err => {
            this.logger.error('addWorkoutDay', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    addWorkout$ = this.actions$.pipe(
        ofType(WorkoutsActionsTypes.AddWorkout),
        mergeMap((action: AddWorkout) => ([
            new AddWorkoutSuccess(action.payload),
            new UpdateWorkouts()
        ])),
        catchError(err => {
            this.logger.error('addWorkout', err);
            return of(new LoadDataError(err.message));
        })
    );

    @Effect()
    changeDisplayMode$ = this.actions$.pipe(
        ofType(WorkoutDaysActionsTypes.ChangeDisplayMode),
        mergeMap((action: ChangeDisplayMode) => ([
            new ChangeDisplayModeSuccess(action.payload),
            new UpdateWorkouts()
        ])),
        catchError(err => {
            this.logger.error('changeDisplayMode', err);
            return of(new LoadDataError(err.message));
        })
    );
}

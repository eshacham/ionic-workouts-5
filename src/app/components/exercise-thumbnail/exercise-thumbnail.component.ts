import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ExerciseBean } from 'src/app/models/Exercise';
import { DisplayMode, WeightUnit, RunningState } from 'src/app/models/enums';
import { Rep } from 'src/app/models/Rep';
import { ExerciseThumbnailPopoverComponent } from '../exercise-thumbnail-popover/exercise-thumbnail-popover.component';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { IAppState } from 'src/app/store/state/app.state';
import { getWorkoutDay } from 'src/app/store/selectors/workoutDays.selectors';
import { WorkoutDayBean } from 'src/app/models/WorkoutDay';
import { getExerciseSet } from 'src/app/store/selectors/exerciseSets.selectors';
import {
    ResetReps,
    SetRepsActiveState,
    SetInactiveReps,
    SetRepsCompleteState,
    SetRepsIncompleteState,
    DeleteExercise,
    UpdateExercise,
    AddRep,
    DeleteRep,
} from 'src/app/store/actions/exercises.actions';
import { SwitchExercisesInSet } from 'src/app/store/actions/exerciseSets.actions';
import { StartExercise, ExerciseCompleted } from 'src/app/store/actions/workoutDays.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { getCurrentWorkout } from 'src/app/store/selectors/workouts.selectors';
import { Router } from '@angular/router';
import { ScrollToExerciseMedia } from 'src/app/store/actions/exercisesMedia.actions';

const MAXREPS = 5;
const MINREPS = 1;

@Component({
    selector: 'app-exercise-thumbnail',
    templateUrl: './exercise-thumbnail.component.html',
    styleUrls: ['./exercise-thumbnail.component.scss'],
})
export class ExerciseThumbnailComponent implements OnInit, OnDestroy {
    activeRepIndex = 0;
    activeExerciseInSetIndex = 0;
    remainingTimedRepSec = 0;
    timedRepTimer = null;
    secToRestAfterCurrentRep = 0;
    remainingTimedRestSec = 0;
    timedRestTimer = null;
    displayMode = DisplayMode;
    weightUnit = WeightUnit;
    private logger: Logger;

    exercises: ExerciseBean[];
    images: ExerciseMediaBean[];
    restBetweenReps = 0;
    restAfterExercise = 0;
    private expanded = false;
    private isInRunningMode = false;
    private isInEditMode = false;
    private mode: DisplayMode = DisplayMode.Display;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    @Input() dayId: string;
    @Input() exerciseSetId: string;
    @Input() exerciseSetIndex: number;

    get activeExercise(): ExerciseBean {
        return this.exercises[this.activeExerciseInSetIndex];
    }

    get isPrevRepAvailable(): boolean {
        const isPrevAvail =
            this.activeRepIndex > 0 ||
            this.activeExerciseInSetIndex > 0 ||
            this.timedRepRemaining > 0 ||
            this.timedRestRemaining > 0;
        return isPrevAvail;
    }

    get timedRepRemaining(): number { return this.remainingTimedRepSec; }

    get timedToRestAfterCurrentRep(): number { return this.secToRestAfterCurrentRep; }

    get timedRestRemaining(): number { return this.remainingTimedRestSec; }

    get ExpandedExercises(): ExerciseBean[] {
        return this.expanded ? this.exercises : [];
    }

    get IsRunning(): boolean { return this.isInRunningMode; }
    set IsRunning(val: boolean) {
        this.isInRunningMode = val;
    }

    get IsEditing(): boolean { return this.isInEditMode; }
    set IsEditing(val: boolean) {
        this.isInEditMode = val;
    }
    get isDayInEditMode(): boolean {
        return this.DisplayMode === DisplayMode.Edit;
    }
    get DisplayMode(): DisplayMode {
        return this.mode;
    }
    set DisplayMode(val: DisplayMode) {
        if (this.mode !== val) {
            this.mode = val;
        }
    }

    get isEditMode(): boolean {
        return this.mode === DisplayMode.Edit;
    }

    constructor(
        loggingService: LoggingService,
        private dataService: DataServiceProvider,
        private popoverCtrl: PopoverController,
        private store: Store<IAppState>,
        private router: Router,

    ) {
        this.logger = loggingService.getLogger('App.ExerciseThumbnailComponent');
    }

    ngOnInit() {
        this.store.select(getCurrentWorkout)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
                if (data.selectedDayId === this.dayId) {
                    this.store.select(getExerciseSet(this.exerciseSetId))
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe(exerciseSet => {
                            this.logger.debug('ngOnInit', 'getExerciseSet', exerciseSet);
                            this.exercises = exerciseSet.exercises;
                            this.images = exerciseSet.media;
                            if (this.exercises[0]) {
                                this.restBetweenReps = this.exercises[0].restBetweenReps;
                                this.restAfterExercise = this.exercises[0].restAfterExercise;
                            }
                        });
                    this.store.select(getWorkoutDay(this.dayId))
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe(day => {
                            this.logger.debug('ngOnInit', 'getWorkoutDay', day);
                            if (day) {
                                this.handleWorkoutDayStateChange(day);
                            }
                        });
                }
            });
    }

    ngOnDestroy() {
        this.logger.debug('ngOnDestroy');
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    expandItem(): void {
        this.expanded = !this.expanded;
    }

    handleWorkoutDayStateChange(day: WorkoutDayBean) {
        this.DisplayMode = day.displayMode;
        let activeExerciseName: string;
        if (this.activeExercise) {
            activeExerciseName = this.activeExercise.name;
        }
        let state: string;
        if (day.runningState === RunningState.NA ||
            day.runningExerciseSetIndex !== this.exerciseSetIndex) {
            state = 'stoping';
            this.IsRunning = false;
            this.stopRepTimer();
            this.stopRestTimer();
        } else if (day.runningState === RunningState.Running &&
            day.runningExerciseSetIndex === this.exerciseSetIndex) {
            state = 'starting';
            this.startWorkout();
        }
        this.logger.info('handleWorkoutDayStateChange', `${state} workout`, activeExerciseName);
    }

    toggleEditExercise() {
        this.IsEditing = !this.IsEditing;
    }

    runExercise() {
        this.startWorkout();
        this.store.dispatch(new StartExercise({
            id: this.dayId,
            runningExerciseSetIndex: this.exerciseSetIndex,
        }));
    }

    switchExercises(index: number) {
        this.store.dispatch(new SwitchExercisesInSet({
            setId: this.exerciseSetId,
            lowIndex: index
        }));
    }

    deleteExercise(exercise: ExerciseBean) {
        this.store.dispatch(new DeleteExercise({
            dayId: this.dayId,
            setId: this.exerciseSetId,
            exeId: exercise.id,
            mediaId: exercise.mediaId,
            deleteSet: this.exercises.length === 1
        }));
    }

    goToImages(exercise: ExerciseBean) {
        this.logger.info('goToImages', `going to image ${exercise.id}`);
        this.store.dispatch(new ScrollToExerciseMedia({ imageId: exercise.mediaId }));
        this.router.navigateByUrl('/tabs/tab-library');
    }

    exerciseChanged(index: number, value: string | number, prop: string) {
        this.logger.debug('exerciseChanged', 'value, prop', value, prop);
        const newExe = ExerciseBean
            .copy(this.exercises[index], {
                restBetweenReps: this.restBetweenReps,
                restAfterExercise: this.restAfterExercise
            });
        newExe[prop] = value;
        this.store.dispatch(new UpdateExercise({
            exercise: newExe
        }));
    }

    completeExercise() {
        this.store.dispatch(new ExerciseCompleted({
            id: this.dayId,
            runningExerciseSetIndex: this.exerciseSetIndex,
            displayMode: DisplayMode.Display,
            runningState: RunningState.Completed,
            exerciseSets: null,
            name: null,
            workoutId: null
        }));
    }

    isTimedRepRemaining(repIndex: number): boolean {
        return this.activeRepIndex === repIndex &&
            this.remainingTimedRepSec > 0 && this.IsRunning;
    }

    get isResting(): boolean {
        return this.remainingTimedRestSec > 0 && this.IsRunning;
    }

    get hasSet(): boolean {
        return this.exercises.length > 1;
    }

    exerciseSetSelected() {
    }

    isFirstInSet(exercise: ExerciseBean): boolean {
        return this.hasSet && this.activeExercise === exercise;
    }

    isLastInSet(exercise: ExerciseBean): boolean {
        return this.hasSet && this.exercises[this.exercises.length - 1] === exercise;
    }

    isNotLastInSet(exercise: ExerciseBean): boolean {
        return this.hasSet && this.exercises[this.exercises.length - 1] !== exercise;
    }

    isFirstSet(exercise: ExerciseBean): boolean {
        return !this.hasSet || this.isFirstInSet(exercise);
    }

    isLastSet(exerciseSet: ExerciseBean): boolean {
        return !this.hasSet || this.isLastInSet(exerciseSet);
    }

    get hasTimedRep(): boolean {
        return this.exercises.some((exe) => {
            return exe.reps.some((rep) => {
                return rep.seconds > 0;
            });
        });
    }
    get hasIncompleteTimedRepInActiveRep(): boolean {
        return this.exercises.some((exe) => {
            const rep = exe.reps[this.activeRepIndex];
            return rep.seconds > 0 && !rep.isComplete;
        });
    }
    get hasCompleteTimedRepInActiveRep(): boolean {
        return this.exercises.some((exe) => {
            const rep = exe.reps[this.activeRepIndex];
            return rep.seconds > 0 && rep.isComplete;
        });
    }
    isExecrciseSetActive(exerciseIndex: number): boolean {
        return exerciseIndex === this.activeExerciseInSetIndex;
    }

    getRepClass(rep: Rep, exercise: ExerciseBean) {
        const classes: string[] = ['nonActiveRep'];
        if (this.IsRunning) {
            if (rep.isActive) {
                classes.push('fadeOutAndIn');
            } else { // non active rep
                if (!this.hasTimedRep &&
                    this.activeRepIndex === exercise.reps.indexOf(rep)) {
                    classes.push('fadeOutAndIn');
                }
            }
        }


        return classes;
    }

    getSecondsStateText(rep: Rep) {
        if (rep.isActive) {
            return `${this.timedRepRemaining}/${rep.seconds}`;
        } else {
            return `${rep.seconds}`;
        }
    }

    startWorkout() {
        this.IsRunning = true;
        this.activeExerciseInSetIndex = 0;
        this.resetReps();
        this.startTimedRep();
    }

    private resetReps() {
        this.exercises.forEach((exercise) => this.resetRepsState(exercise));
        this.activeRepIndex = 0;
        this.setExecrciseRepsActiveState(this.activeExercise, this.activeRepIndex);
    }

    private resetRepsState(exercise: ExerciseBean) {
        this.store.dispatch(new ResetReps({ exerciseId: exercise.id }));
    }

    private setExecrciseRepsActiveState(exercise: ExerciseBean, index: number) {
        this.store.dispatch(new SetRepsActiveState({
            exerciseId: exercise.id,
            activeIndex: index
        }));
    }

    private InactiveExerciseReps(exercise: ExerciseBean) {
        this.store.dispatch(new SetInactiveReps({ exerciseId: exercise.id }));
    }

    private startTimedRep() {
        // this.audioService.playStartWorkout();
        this.stopRepTimer();
        this.remainingTimedRepSec = this.activeRep.seconds;
        if (this.remainingTimedRepSec) {
            this.timedRepTimer = setInterval(() => {
                this.remainingTimedRepSec--;
                if (this.remainingTimedRepSec <= 0) {
                    this.stopRepTimer();
                    this.nextRep(true);
                }
            }, 1000);
        }
    }

    private stopRepTimer() {
        if (this.timedRepTimer) {
            clearInterval(this.timedRepTimer);
        }
    }

    private startTimedRest(callbackAction: () => void) {
        // audioService.playStartWorkout();
        this.stopRestTimer();
        this.remainingTimedRestSec = this.secToRestAfterCurrentRep;
        if (this.remainingTimedRestSec) {
            this.timedRestTimer = setInterval(() => {
                this.remainingTimedRestSec--;
                if (this.remainingTimedRestSec <= 0) {
                    this.stopRestTimer();
                    callbackAction();
                }
            }, 1000);
        }
    }

    private stopRestTimer() {
        if (this.timedRestTimer) {
            clearInterval(this.timedRestTimer);
        }
    }

    prevRep() {
        this.stopRepTimer();
        this.remainingTimedRepSec = 0;
        if (this.activeExerciseInSetIndex > 0 &&
            (this.hasCompleteTimedRepInActiveRep || this.hasIncompleteTimedRepInActiveRep)) {
            this.setRepsIncompleteState(this.exercises[this.activeExerciseInSetIndex - 1].id, this.activeRepIndex);
            this.activatePrevExercise();
        } else {
            if (this.activeRepIndex > 0) {
                this.exercises.forEach(exercise => {
                    this.setRepsIncompleteState(exercise.id, this.activeRepIndex - 1);
                });
            }
            this.activatePrevRep();
        }
        this.stopRestTimer();
        this.stopRepTimer();
        this.startTimedRep();
    }

    private setRepsIncompleteState(exerciseId: string, incompleteIndex: number) {
        this.store.dispatch(new SetRepsIncompleteState({
            exerciseId,
            incompleteIndex
        }));
    }

    skipRest() {
        this.remainingTimedRestSec = 0;
    }
    private activateNextExercise() {
        this.InactiveExerciseReps(this.activeExercise);
        this.activeExerciseInSetIndex++;
        this.setExecrciseRepsActiveState(this.activeExercise, this.activeRepIndex);
        this.startTimedRep();
    }
    private activatePrevExercise() {
        this.InactiveExerciseReps(this.activeExercise);
        this.activeExerciseInSetIndex--;
        this.setExecrciseRepsActiveState(this.activeExercise, this.activeRepIndex);
        this.startTimedRep();
    }

    private activateNextRep() {
        this.InactiveExerciseReps(this.activeExercise);
        this.activeExerciseInSetIndex = 0;
        this.setExecrciseRepsActiveState(this.activeExercise, ++this.activeRepIndex);
        this.startTimedRep();
    }
    private activatePrevRep() {
        if (this.activeRepIndex > 0) {
            this.InactiveExerciseReps(this.activeExercise);
            this.activeExerciseInSetIndex = this.exercises.length - 1;
            this.setExecrciseRepsActiveState(this.activeExercise, --this.activeRepIndex);
        }
        this.startTimedRep();
    }

    nextRep(shouldRest: boolean) {
        this.stopRepTimer();
        this.remainingTimedRepSec = 0;
        if (this.exercises.length > this.activeExerciseInSetIndex + 1 &&
            this.hasIncompleteTimedRepInActiveRep) {
            this.setRepsCompleteState(this.activeExercise.id, this.activeRepIndex);
            // need to go to the next exercise with current rep
            if (shouldRest) {
                this.secToRestAfterCurrentRep = this.activeExercise.restBetweenReps;
                this.startTimedRest(() => this.activateNextExercise());
            } else {
                this.skipRest();
                this.activateNextExercise();
            }
        } else {
            this.exercises.forEach((exercise) => {
                this.setRepsCompleteState(exercise.id, this.activeRepIndex);
            });
            this.setRepsCompleteState(this.activeExercise.id, this.activeRepIndex);
            // if there are more reps, need to go to the next rep on the first exercise
            if (this.activeExercise.reps.length > this.activeRepIndex + 1) {
                if (shouldRest) {
                    this.secToRestAfterCurrentRep = this.activeExercise.restBetweenReps;
                    this.startTimedRest(() => this.activateNextRep());
                } else {
                    this.skipRest();
                    this.activateNextRep();
                }
            } else {
                this.stopRepTimer();
                if (shouldRest) {
                    this.secToRestAfterCurrentRep = this.activeExercise.restAfterExercise;
                    this.startTimedRest(() => this.completeExercise());
                } else {
                    this.completeExercise();
                }
            }
        }
    }

    private setRepsCompleteState(exerciseId: string, completeIndex: number) {
        this.store.dispatch(new SetRepsCompleteState({
            exerciseId,
            completeIndex
        }));
    }

    get isActiveRepCompleted(): boolean {
        return this.activeRep.isComplete;
    }

    get activeRep(): Rep {
        return this.activeExercise ? this.activeExercise.reps[this.activeRepIndex] : null;
    }

    addRep(index: number) {
        if (!this.isMaxReps) {
            this.exercises.forEach(exe => {
                this.store.dispatch(new AddRep({
                    exerciseId: exe.id,
                    copyFromIndex: index
                }));
            });
        }
    }

    deleteRep(index: number) {
        if (!this.isMinReps) {
            this.exercises.forEach(exe => {
                this.store.dispatch(new DeleteRep({
                    exerciseId: exe.id,
                    indexToDelete: index
                }));
            });
        }
    }

    get isMaxReps(): boolean {
        return this.exercises[0].reps.length === MAXREPS;
    }

    get isMinReps(): boolean {
        return this.exercises[0].reps.length === MINREPS;
    }

    async presentPopover(event: Event, rep: Rep, repIndex: number, exeId: string) {
        const popover = await this.popoverCtrl.create({
            component: ExerciseThumbnailPopoverComponent,
            event,
            componentProps: { rep, exeId, repIndex }
        });
        popover.present();
    }

    safeImage(media: ExerciseMediaBean): any {
        return this.dataService.safeImage(media);
    }
}

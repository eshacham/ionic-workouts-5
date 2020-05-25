import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PopoverController, AlertController, ModalController} from '@ionic/angular';
import { ExerciseBean } from 'src/app/models/Exercise';
import { DisplayMode, WeightUnit, RunningState, ExerciseAction } from 'src/app/models/enums';
import { Rep, IRunningRep } from 'src/app/models/Rep';
import { ExerciseThumbnailPopoverComponent } from '../exercise-thumbnail-popover/exercise-thumbnail-popover.component';
import { ChooseExerciseActionPopoverComponent } from '../choose-exercise-action-popover/choose-exercise-action-popover.component';
import { ExerciseVariationPopoverComponent } from '../exercise-variation-popover/exercise-variation-popover.component';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { IAppState } from 'src/app/store/state/app.state';
import { getWorkoutDay } from 'src/app/store/selectors/workoutDays.selectors';
import { getExerciseSet } from 'src/app/store/selectors/exerciseSets.selectors';
import { DeleteExercise, UpdateExercise, AddRep, DeleteRep,
} from 'src/app/store/actions/exercises.actions';
import { SwitchExercisesInSet } from 'src/app/store/actions/exerciseSets.actions';
import { StartExercise, ExerciseCompleted } from 'src/app/store/actions/workoutDays.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { Router, NavigationExtras } from '@angular/router';
import { AudioServiceProvider } from 'src/app/providers/audio-service/audio-service';
import { getRunningWorkoutDayState } from 'src/app/store/selectors/data.selectors';
import { IRunningWorkoutDayState } from 'src/app/store/state/data.state';
import { ExerciseDetailModalComponent } from '../exercise-detail-modal/exercise-detail-modal/exercise-detail-modal.component';
import { Animation, AnimationController } from '@ionic/angular';

const MAXREPS = 5;
const MINREPS = 1;

@Component({
    selector: 'app-exercise-thumbnail',
    templateUrl: './exercise-thumbnail.component.html',
    styleUrls: ['./exercise-thumbnail.component.scss'],
})
export class ExerciseThumbnailComponent implements OnInit, OnDestroy, AfterViewInit {
    private activeRepIndex = 0;
    private activeExerciseInSetIndex = 0;
    private remainingTimedRepSec = 0.0;
    private timedRepTimer = null;
    private secToRestAfterCurrentRep = 0;
    private remainingTimedRestSec = 0;
    private timedRestTimer = null;
    private logger: Logger;
    private isInRunningMode = false;
    private isInEditMode = false;
    private mode: DisplayMode = DisplayMode.Display;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    exercises: ExerciseBean[];
    images: ExerciseMediaBean[];
    runningExercises: Map<string, IRunningRep[]>;
    restBetweenReps = 0;
    restAfterExercise = 0;
    isEditSetExpanded = false;
    isViewSetExpanded = false;
    displayMode = DisplayMode;
    weightUnit = WeightUnit;
    repProgressBar: Animation;
    restProgressBar: Animation;
    @Input() isVolumeMuted: boolean;
    @Input() workoutId: string;
    @Input() dayId: string;
    @Input() exerciseSetId: string;
    @Input() exerciseSetIndex: number;
    @ViewChild('activeRepProgresssBar', {static: false, read: ElementRef }) activeRepProgresssBar: ElementRef;
    @ViewChild('activeRestProgresssBar', {static: false, read: ElementRef }) activeRestProgresssBar: ElementRef;
    private get activeExercise(): ExerciseBean {
        return this.exercises[this.activeExerciseInSetIndex];
    }

    get isPrevRepAvailable(): boolean {
        const isPrevAvail =
            this.activeRepIndex > 0 ||
            // this.activeExerciseInSetIndex > 0 ||
            // this.timedRepRemaining > 0 ||
            // this.timedRestRemaining > 0;
            this.lastCompletedMultiSetExerciseIndex > -1;
        return isPrevAvail;
    }

    get timedRepRemaining(): number { return this.remainingTimedRepSec; }

    get timedRestRemaining(): number { return this.remainingTimedRestSec; }

    get IsRunning(): boolean { return this.isInRunningMode; }
    set IsRunning(val: boolean) {
        if (this.isInRunningMode !== val) {
            this.logger.info('IsRunningSetter', `${val ? 'starting' : 'stopping'} exercise`,
                this.activeExercise ? this.activeExercise.name : 'unknown');
            this.isInRunningMode = val;
        }
    }

    get IsEditing(): boolean { return this.isInEditMode; }
    set IsEditing(val: boolean) {
        this.isInEditMode = val;
    }

    get DisplayMode(): DisplayMode {
        return this.mode;
    }
    set DisplayMode(val: DisplayMode) {
        if (this.mode !== val) {
            this.mode = val;
        }
    }

    get RunningExercises(): Map<string, IRunningRep[]> {
        if (!this.runningExercises) {
            this.runningExercises = this.createRunningExercisesMap(this.exercises);
        }
        return this.runningExercises;
    }
    set RunningExercises(map: Map<string, IRunningRep[]>) {
        this.runningExercises = map;
    }

    createRunningExercisesMap(exercises: ExerciseBean[]): Map<string, IRunningRep[]> {
        const map = new Map();
        this.exercises.forEach(e => map.set(e.id, e.reps.map(r => (
            { isActive: false, isComplete: false, seconds: r.seconds }
        ))));
        return map;
    }

    constructor(
        loggingService: LoggingService,
        private dataService: DataServiceProvider,
        private popoverCtrl: PopoverController,
        private audioService: AudioServiceProvider,
        private store: Store<IAppState>,
        private router: Router,
        private alertController: AlertController,
        private modalController: ModalController,
        private animationCtrl: AnimationController
    ) {
        this.logger = loggingService.getLogger('App.ExerciseThumbnailComponent');
    }

    ngOnInit() {
        this.store
        .select(getExerciseSet(this.exerciseSetId))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(exerciseSet => {
            this.logger.debug('ngOnInit', 'getExerciseSet', exerciseSet);
            this.exercises = exerciseSet.exercises;
            this.images = exerciseSet.media;
            if (this.exercises[0]) {
                this.restBetweenReps = this.exercises[0].restBetweenReps;
                this.restAfterExercise = this.exercises[0].restAfterExercise;
            }
            this.RunningExercises = this.createRunningExercisesMap(this.exercises);
        });

        this.store
        .select(getWorkoutDay(this.dayId))
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(day => {
            if (day) {
                setTimeout(() => this.DisplayMode = day.displayMode || DisplayMode.Display, 0);
            }
        });
    }

    ngAfterViewInit(): void {
        this.store
        .select(getRunningWorkoutDayState)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(runningDayState => {
            this.logger.debug('ngOnInit', 'getRunningWorkoutDayState', runningDayState);
            this.handleWorkoutDayRunningStateChange(runningDayState)
        });
    }

    ionViewDidEnter() {
        this.logger.debug('ionViewDidEnter', this.exerciseSetId);
    }

    ngOnDestroy() {
        this.logger.debug('ngOnDestroy', this.exerciseSetId);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    toggleExpandedExercise(): void {
        this.isEditSetExpanded = !this.isEditSetExpanded;
    }

    handleWorkoutDayRunningStateChange(runningDayState: IRunningWorkoutDayState) {
        if (!runningDayState) {
            // nobody should be running
            if (this.DisplayMode !== DisplayMode.Display) {
                this.DisplayMode = DisplayMode.Display;
                this.stopWorkout();
            }
        } else if (runningDayState.dayId === this.dayId) {
            this.DisplayMode = DisplayMode.Workout;
            // not your exercise -> stop running
            if (runningDayState.runningState === RunningState.NA ||
                runningDayState.runningExerciseSetIndex !== this.exerciseSetIndex) {
                if (this.IsRunning) {
                    this.stopWorkout();
                }
            } else if (runningDayState.runningState === RunningState.Running &&
                runningDayState.runningExerciseSetIndex === this.exerciseSetIndex) {
                // this is your day and exercise -> start running
                if (!this.IsRunning) {
                    this.startWorkout();
                }
            }
        } else {
            // not your day -> stop running
            if (this.DisplayMode !== DisplayMode.Display) {
                this.DisplayMode = DisplayMode.Display;
                this.stopWorkout();
            }
        }
    }

    runExercise() {
        this.startWorkout();
        this.store.dispatch(new StartExercise({
            workoutId: this.workoutId,
            dayId: this.dayId,
            runningExerciseSetIndex: this.exerciseSetIndex,
            runningState: RunningState.Running,
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
    selectExerciseAction(event: Event, exercise: ExerciseBean, exerciseIndex: number, islast: boolean) {
        this.presentActionsPopover(event, exercise, exerciseIndex, [
            ExerciseAction.DeleteExercise,
            ExerciseAction.SwapSets,
            ExerciseAction.GotoExercise
        ], islast);
    }
    selectSetAction(event: Event, exercise: ExerciseBean, repIndex: number, rep: Rep) {
        this.presentActionsPopover(event, exercise, repIndex, [
            ExerciseAction.EditSet,
            ExerciseAction.AddSet,
            ExerciseAction.DeleteSet,
        ], false, rep);
    }
    selectExerciseViewAction(event: Event, exercise: ExerciseBean, exerciseIndex: number) {
        const actions = [
            ExerciseAction.ViewFirstMediaLarge,
            ExerciseAction.GotoExercise,
        ];
        if (!this.IsRunning) {
            actions.push(ExerciseAction.ViewSet);
        }
        this.presentActionsPopover(event, exercise, exerciseIndex, actions, false);
    }

    goToImagesLibraryPage(exercise: ExerciseBean) {
        this.logger.info('goToImages', `going to image ${exercise.id}`);
        const extra: NavigationExtras = {
            queryParams: { mediaId: exercise.mediaId }
          };
          this.router.navigate(['/tabs/tab-library'], extra);
    }

    exerciseChanged(index: number, value: string | number, prop: string) {
        if (this.exercises[index][prop] === value) {
            return;
        }
        this.logger.debug('exerciseChanged', `${prop} to ${value}`);
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
            workoutId: this.workoutId,
            dayId: this.dayId,
            runningExerciseSetIndex: this.exerciseSetIndex,
            runningState: RunningState.Completed,
        }));
    }

    get isResting(): boolean {
        return this.remainingTimedRestSec > 0 && this.IsRunning;
    }

    isTimedRep(repIndex: number, exeId: string): boolean {
        return this.exercises.some((exe) => {
            return exeId === exe.id && exe.reps[repIndex].seconds > 0;
        });
    }

    getRunningExeRep(repIndex: number, exerciseId: string): IRunningRep {
        let rep: IRunningRep = { isActive: false, isComplete: false }
        if (this.RunningExercises.has(exerciseId)) {
            const reps = this.RunningExercises.get(exerciseId)
            if (reps.length && reps.length > repIndex) {
                rep = reps[repIndex];
            }
        }
        return rep;
    }

    get getExeIdsOfIncompleteNonTimedRepInActiveRep(): ExerciseBean[] {
        return this.exercises.filter((exe) => {
            const rep = this.getRunningExeRep(this.activeRepIndex, exe.id);
            return !rep.seconds && !rep.isComplete;
        });
    }
    get hasIncompleteTimedRepInActiveRep(): boolean {
        return this.exercises.some((exe) => {
            const rep = this.getRunningExeRep(this.activeRepIndex, exe.id);
            return rep.seconds > 0 && !rep.isComplete;
        });
    }
    get hasCompleteTimedRepInActiveRep(): boolean {
        return this.exercises.some((exe) => {
            const rep = this.getRunningExeRep(this.activeRepIndex, exe.id);
            return rep.seconds > 0 && rep.isComplete;
        });
    }

    getRepClass(index: number, exerciseId: string): string {
        let cls = '';
        if (this.IsRunning) {
            cls = 'divRep';
            if (this.isRepConsideredActive(index, exerciseId)) {
                cls += ' divActive';
            }
            cls += ' divNonActive';
        }
        return cls;
    }

    isRepComplete(index: number, exerciseId: string) {
        return this.getRunningExeRep(index, exerciseId).isComplete;
    }
    isRepActive(index: number, exerciseId: string) {
        const rep = this.getRunningExeRep(index, exerciseId);
        return rep.isActive;
    }

    private isRepConsideredActive(repIndex: number, exerciseId: string) {
        const rep = this.getRunningExeRep(repIndex, exerciseId);
        // if (rep.isComplete) {
        //     return false;
        // }
        return (rep.isActive)// || (this.activeRepIndex === repIndex && !this.isTimedRep(repIndex, exerciseId)));
    }

    getRepTimesStyle(repIndex: number, exerciseId: string): { animation: string} {
        const animation = {
            animation: `${this.isRepConsideredActive(repIndex, exerciseId) ? 4 : 0}s linear infinite fadeinout`
        };
        return animation;
    }

    getSecondsStateText(index: number, exerciseId: string) {
        const rep = this.getRunningExeRep(index, exerciseId);
        if (rep.isComplete) {
            return `${rep.seconds}`;
        }
        if (rep.isActive) {
            return `${Math.ceil(this.timedRepRemaining)}`;
        }
        return `${rep.seconds}`;
    }

    get restSecondsStateText() {
        return `${Math.ceil(this.timedRestRemaining)}`;
    }

    startWorkout() {
        this.exercises.forEach(e => this.RunningExercises.set(e.id, e.reps.map(r => (
            { isActive: false, isComplete: false, seconds: r.seconds }
        ))))
        this.IsRunning = true;
        this.activeExerciseInSetIndex = 0;
        this.resetReps();
        this.nextRep();
    }
    stopWorkout() {
        if (this.exercises && this.exercises.length) {
            this.IsRunning = false;
            this.resetReps();
            this.stopRepTimer();
            this.stopRestTimer();
            this.remainingTimedRestSec = 0;
            this.remainingTimedRepSec = 0;
        }
    }

    private resetReps() {
        this.exercises.forEach((exercise) => this.resetRepsState(exercise));
        this.activeRepIndex = 0;
    // if (this.exercises.length === 1)
    //     this.setExecrciseRepsActiveState(this.activeExercise, this.activeRepIndex);
    }

    private resetRepsState(exercise: ExerciseBean) {
        const reps = this.RunningExercises.get(exercise.id);
        reps.forEach(r => {
            r.isActive = false;
            r.isComplete = false;
        });
    }

    private setExecrciseRepsActiveState(exercise: ExerciseBean, activeRepIndex: number) {
        const reps = this.RunningExercises.get(exercise.id);
        reps.forEach((r, i) => {
            r.isActive = i === activeRepIndex;
        });
    }

    private InactiveExerciseReps(exercise: ExerciseBean) {
        const reps = this.RunningExercises.get(exercise.id);
        reps.forEach((r, i) => {
            r.isActive = false;
        });
    }

    private startTimedRep() {
        this.stopRepTimer();
        this.remainingTimedRepSec = this.ActiveRepTime;
        if (this.remainingTimedRepSec) {
            setTimeout(() => {
                this.animateProgressBar(this.remainingTimedRepSec, this.activeRepProgresssBar.nativeElement);
            }, 0);
            const interval = 1000;
            const intervalStep = interval / 1000;
            this.timedRepTimer = setInterval(() => {
                this.remainingTimedRepSec -= intervalStep;
                if (this.remainingTimedRepSec <= 0) {
                    this.stopRepTimer();
                    this.stopAnimatedProgressBar(this.repProgressBar);
                    this.nextRep();
                }
            }, interval);
        }
    }

    stopAnimatedProgressBar(bar: Animation){
        if (bar) {
            bar.stop();
        }
        if (!this.isVolumeMuted) {
            this.audioService.playStartWorkout();
        }
    }

    animateProgressBar(remainingTimedRepSec: number, element) {
        this.repProgressBar = this.animationCtrl.create()
        .addElement(element)
        .duration(remainingTimedRepSec*1000)
        .fromTo('transform', 'scalex(0)', 'scalex(1)')
        this.repProgressBar.play();
    }
    private stopRepTimer() {
        if (this.timedRepTimer) {
            clearInterval(this.timedRepTimer);
        }
        this.remainingTimedRepSec = 0;
        this.stopAnimatedProgressBar(this.repProgressBar);
    }

    private startTimedRest(callbackAction: () => void) {
        this.stopRestTimer();
        this.remainingTimedRestSec = this.secToRestAfterCurrentRep;
        if (this.remainingTimedRestSec) {
            setTimeout(() => {
                this.animateProgressBar(this.remainingTimedRestSec, this.activeRestProgresssBar.nativeElement);
            }, 0);
            const interval = 1000;
            const intervalStep = interval / 1000;
            this.timedRestTimer = setInterval(() => {
                this.remainingTimedRestSec -= intervalStep;
                if (this.remainingTimedRestSec <= 0) {
                    this.stopRestTimer();
                    this.stopAnimatedProgressBar(this.restProgressBar);
                    return new callbackAction();
                }
            }, interval);
        }
    }
    private stopRestTimer() {
        if (this.timedRestTimer) {
            clearInterval(this.timedRestTimer);
        }
        this.remainingTimedRestSec = 0;
        this.stopAnimatedProgressBar(this.restProgressBar);
    }

    prevRep() {
        // if (this.exercises.length > 1) {
            this.prevRepMultiSet();
        // } else {
        //     this.prevRepRegularSet();
        // }
    }
    prevRepRegularSet() {
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

    prevRepMultiSet() {
        this.stopRepTimer();
        this.remainingTimedRepSec = 0;
        this.inactivateExercisesCurrentRep();
        this.incompleteExercisesCurrentRep();
        this.startTimedRep();
    }
    inactivateExercisesCurrentRep() {
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        exerciseIds.forEach(id => {
            const rep = this.getRunningExeRep(this.activeRepIndex, id);
            if (rep.isActive){
                rep.isActive = false;
            }
        });
    }
    incompleteExercisesCurrentRep() {
        let skip = false;
        if (this.lastCompletedMultiSetExerciseIndex === -1) {
            this.activeRepIndex--;
        }
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(0, this.lastCompletedMultiSetExerciseIndex + 1).reverse();
        exerciseIds.forEach((id, index) => {
            const rep = this.getRunningExeRep(this.activeRepIndex, id);
            if ((index === 0 || !rep.seconds) && !skip) {
                rep.isComplete = false;
                rep.isActive = true;
            }
            skip = skip || !!rep.seconds;
        });
    }

    skipRest() {
        this.remainingTimedRestSec = 0;
        this.remainingTimedRepSec = 0;
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

    nextRep(withRest = true) {
        this.stopRepTimer();
        this.remainingTimedRepSec = 0;
        // if (this.exercises.length > 1) {
            this.nextRepMultiSet(withRest);
        // } else {
        //     this.startTimedRep();
        //     this.nextRepRegularSet();
        // }
    }
    nextRepRegularSet() {
        this.setRepsCompleteState(this.activeExercise.id, this.activeRepIndex);
        if (this.activeExercise.reps.length > this.activeRepIndex + 1) {
            this.secToRestAfterCurrentRep = this.activeExercise.restBetweenReps;
            this.startTimedRest(() => this.activateNextRep());
        } else {
            this.stopRepTimer();
            this.secToRestAfterCurrentRep = this.activeExercise.restAfterExercise;
            this.startTimedRest(() => this.completeExercise());
        }
    }
    nextRepMultiSet(withRest = true) {
        this.completeCurrentMultiSetReps();
        if (this.activateNextMultiSetReps()) {
            this.skipRest();
            this.startTimedRep();
        } else {
            if (this.exercises[0].reps.length > this.activeRepIndex + 1) {
                this.secToRestAfterCurrentRep = this.exercises[0].restBetweenReps;
                if (withRest) {
                    this.startTimedRest(() => {
                        this.activeRepIndex ++;
                        this.nextRepMultiSet();
                    });
                } else {
                    this.activeRepIndex ++;
                    this.nextRepMultiSet();
                }
            } else {
                this.stopRepTimer();
                this.secToRestAfterCurrentRep = this.exercises[0].restAfterExercise;
                if (withRest) {
                    this.startTimedRest(() => {
                        this.completeExercise()
                    });
                } else {
                    this.completeExercise();
                }
            }
        }
    }

    private completeCurrentMultiSetReps() {
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        exerciseIds.forEach(id => {
            const rep = this.getRunningExeRep(this.activeRepIndex, id);
            if (rep.isActive) {
                rep.isComplete = true;
                rep.isActive = false;
            }
        });
    }

    private activateNextMultiSetReps() {
        let activated = false;
        let skip = false;
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        exerciseIds.forEach((id, index) => {
            const rep = this.getRunningExeRep(this.activeRepIndex, id);
            if ((index === 0 || !rep.seconds) && !skip) {
                rep.isActive = true;
                activated = true;
            }
            skip = skip || !!rep.seconds;
        });
        return activated;
    }

    get lastCompletedMultiSetExerciseIndex(): number {
        let lastCompleted = this.exercises.map(exe=>exe.id).reverse().findIndex((id) => {
            const rep = this.getRunningExeRep(this.activeRepIndex, id);
            return rep.isComplete;
        });
        if (lastCompleted > -1) {
            lastCompleted = this.exercises.length - 1 - lastCompleted;
        }
        return lastCompleted;
    }
    private setRepsCompleteState(exerciseId: string, completeIndex: number) {
        const reps = this.RunningExercises.get(exerciseId);
        reps.forEach((r, i) => {
            r.isActive = false;
            r.isComplete = (i === completeIndex ? true : r.isComplete);
        });
    }

    private setRepsIncompleteState(exerciseId: string, incompleteIndex: number) {
        const reps = this.RunningExercises.get(exerciseId);
        reps.forEach((r, i) => {
            r.isActive = false;
            r.isComplete = (i === incompleteIndex ? false : r.isComplete);
        });
    }

    get activeRep(): Rep {
        return this.activeExercise ? this.activeExercise.reps[this.activeRepIndex] : null;
    }

    get ActiveRepTime(): number {
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        const rep = this.getRunningExeRep(this.activeRepIndex, exerciseIds[0]);
        return rep.seconds;
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

    toggleViewSet() {
        this.isViewSetExpanded = !this.isViewSetExpanded;
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
    async presentVariationPopover(event: Event, exercise: ExerciseBean) {
        const popover = await this.popoverCtrl.create({
            component: ExerciseVariationPopoverComponent,
            event,
            componentProps: {
                exercise
            }
        });
        popover.present();
    }

    async presentPopover(event: Event, rep: Rep, repIndex: number, exeId: string) {
        const popover = await this.popoverCtrl.create({
            component: ExerciseThumbnailPopoverComponent,
            event,
            componentProps: { rep, exeId, repIndex }
        });
        popover.present();
    }
    async presentActionsPopover(
        event: Event,
        exercise: ExerciseBean,
        index: number,
        actions: ExerciseAction[],
        isLast?: boolean,
        rep?: Rep,
    ) {
        const popover = await this.popoverCtrl.create({
            component: ChooseExerciseActionPopoverComponent,
            event,
            componentProps: {
                canSwap: !isLast,
                isViewSetExpanded: this.isViewSetExpanded,
                rep,
                isMinReps: this.isMinReps,
                isMaxReps: this.isMaxReps,
                actions,
                multiSet: this.exercises.length > 1,
            }
        });
        popover.present();
        popover.onDidDismiss()
            .then(result => {
                this.logger.info('onDidDismiss', result.data as ExerciseAction);
                switch (result.data) {
                    case ExerciseAction.DeleteExercise:
                        this.deleteExercise(exercise);
                        break;
                    case ExerciseAction.GotoExercise:
                        this.goToImagesLibraryPage(exercise);
                        break;
                    case ExerciseAction.SwapSets:
                        this.switchExercises(index);
                        break;
                    case ExerciseAction.EditSet:
                        this.presentPopover(event, rep, index, exercise.id);
                        break;
                    case ExerciseAction.AddSet:
                        this.addRep(index);
                        break;
                    case ExerciseAction.DeleteSet:
                        this.deleteRep(index);
                        break;
                    case ExerciseAction.ViewSet:
                        this.toggleViewSet();
                        break;
                    case ExerciseAction.ViewFirstMediaLarge:
                        this.viewLarge(this.images[index]);
                        break;
                    default:
                        break;
                }
            });
    }


    safeImage(media: ExerciseMediaBean, index: number): any {
        return this.dataService.safeImage(media, index);
    }

    editExerciseName(event: any, exe: ExerciseBean, index: number) {
        event.stopPropagation();
        this.presentAlertPrompt(exe, index);
      }

      async presentAlertPrompt(exe: ExerciseBean, index: number) {
        const alert = await this.alertController.create({
          header: 'Execrcise Name',
          inputs: [{
            name: 'text',
            id: 'text',
            type: 'textarea',
            value: exe.name,
            placeholder: 'Enter exercise name here...'
          },
          ],
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.logger.debug('presentAlertPrompt', 'edit cancelled');
            }
          }, {
            text: 'Save',
            handler: (data) => {
              if (data.text) {
                this.logger.debug('presentAlertPrompt', 'saving text', data.text);
                this.exerciseChanged(index, data.text, 'name');
              } else {
                return false;
              }
            }
          }
          ]
        });

        alert.present();
      }

      viewLarge(item: ExerciseMediaBean): void {
        this.logger.debug('viewLarge', item.name);
        this.presentDetailModal(item);
      }
      async presentDetailModal(media: ExerciseMediaBean) {
        const modal = await this.modalController.create({
          component: ExerciseDetailModalComponent,
          componentProps: { media, selectedIndex: 0 },
          swipeToClose: true,
          // presentingElement: this.routerOutlet.nativeEl,
          cssClass: 'auto-height',
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        this.logger.info('presentDetailModal', 'onWillDismiss', data);
      }

}

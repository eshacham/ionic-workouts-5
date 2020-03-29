import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PopoverController, AlertController} from '@ionic/angular';
import { ExerciseBean } from 'src/app/models/Exercise';
import { DisplayMode, WeightUnit, RunningState, ExerciseAction } from 'src/app/models/enums';
import { Rep } from 'src/app/models/Rep';
import { ExerciseThumbnailPopoverComponent } from '../exercise-thumbnail-popover/exercise-thumbnail-popover.component';
import { ChooseExerciseActionPopoverComponent } from '../choose-exercise-action-popover/choose-exercise-action-popover.component';
import { ExerciseVariationPopoverComponent } from '../exercise-variation-popover/exercise-variation-popover.component';
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
import { StartExercise, ExerciseCompleted, SetExerciseSetInWorkoutDay } from 'src/app/store/actions/workoutDays.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { getCurrentWorkout } from 'src/app/store/selectors/workouts.selectors';
import { Router } from '@angular/router';
import { ScrollToExerciseMedia } from 'src/app/store/actions/exercisesMedia.actions';
import { AudioServiceProvider } from 'src/app/providers/audio-service/audio-service';

const MAXREPS = 5;
const MINREPS = 1;

@Component({
    selector: 'app-exercise-thumbnail',
    templateUrl: './exercise-thumbnail.component.html',
    styleUrls: ['./exercise-thumbnail.component.scss'],
})
export class ExerciseThumbnailComponent implements OnInit, OnDestroy {
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
    restBetweenReps = 0;
    restAfterExercise = 0;
    expanded = false;
    displayMode = DisplayMode;
    weightUnit = WeightUnit;
    @Input() workoutId: string;
    @Input() dayId: string;
    @Input() exerciseSetId: string;
    @Input() exerciseSetIndex: number;

    private get activeExercise(): ExerciseBean {
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

    get timedRestRemaining(): number { return this.remainingTimedRestSec; }

    get ExpandedExercises(): ExerciseBean[] {
        return this.expanded ? this.exercises : [];
    }

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

    constructor(
        loggingService: LoggingService,
        private dataService: DataServiceProvider,
        private popoverCtrl: PopoverController,
        private audioService: AudioServiceProvider,
        private store: Store<IAppState>,
        private router: Router,
        private alertController: AlertController,
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

    toggleExpandedExercise(): void {
        if (!this.expanded) {
            this.store.dispatch(new SetExerciseSetInWorkoutDay({
                workoutId: this.workoutId,
                dayId: this.dayId,
                setId: this.exerciseSetId,
                scroll: true
            }));
        }
        this.expanded = !this.expanded;
    }

    handleWorkoutDayStateChange(day: WorkoutDayBean) {
        this.DisplayMode = day.displayMode;
        if (day.runningState === RunningState.NA ||
            day.runningExerciseSetIndex !== this.exerciseSetIndex) {
            if (this.exercises.length) {
                this.stopWorkout();
            }
        } else if (day.runningState === RunningState.Running &&
            day.runningExerciseSetIndex === this.exerciseSetIndex) {
            if (!this.IsRunning) {
                this.startWorkout(false);
            }
        }
    }

    runExercise() {
        this.startWorkout(true);
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
    selectExerciseAction(event: Event, exercise: ExerciseBean, index: number, islast: boolean) {
        this.presentActionsPopover(event, exercise, index, [
            ExerciseAction.DeleteExercise,
            ExerciseAction.SwapSets,
            ExerciseAction.GotoExercise
        ], islast);
    }
    selectSetAction(event: Event, exercise: ExerciseBean, index: number, rep: Rep) {
        this.presentActionsPopover(event, exercise, index, [
            ExerciseAction.EditSet,
            ExerciseAction.AddSet,
            ExerciseAction.DeleteSet,
        ], false, rep);
    }
    selectExerciseViewAction(event: Event, exercise: ExerciseBean, index: number) {
        this.presentActionsPopover(event, exercise, index, [
            ExerciseAction.ViewSet,
            ExerciseAction.GotoExercise,
        ], false);
    }

    goToImagesLibraryPage(exercise: ExerciseBean) {
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

    get isResting(): boolean {
        return this.remainingTimedRestSec > 0 && this.IsRunning;
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

    getRepClass(rep: Rep, index: number): string {
        let cls = '';
        if (this.IsRunning) {
            cls = 'divRep';
            if (this.isRepConsideredActive(rep, index)) {
                cls += ' divActive';
            }
            cls += ' divNonActive';
        }
        return cls;
    }

    isRepConsideredActive(rep: Rep, index: number) {
        if (rep.isComplete) {
            return false;
        }
        return (rep.isActive || (this.activeRepIndex === index && !this.activeRep.seconds));
    }

    getRepTimesStyle(rep: Rep, index): any {
        const animation = {
            animation: `${this.isRepConsideredActive(rep, index) ? 4 : 0}s linear infinite fadeinout`
        };
        return animation;
    }

    getSecondsStateText(rep: Rep) {
        if (rep.isComplete) {
            return `${rep.seconds}`;
        }
        if (rep.isActive) {
            return `${Math.ceil(this.timedRepRemaining)}`;
        }
        return `${rep.seconds}`;
    }
    getSecondsProgress(rep: Rep) {
        if (rep.isComplete) {
            return 1;
        }
        if (rep.isActive) {
            return this.timedRepRemaining / rep.seconds;
        }
        return 1;
    }
    getSecondsRestProgress() {
        if (!this.isResting) {
            return 1;
        }

        return this.remainingTimedRestSec / this.secToRestAfterCurrentRep;
    }

    get restSecondsStateText() {
        return `${Math.ceil(this.timedRestRemaining)}`;
    }

    startWorkout(resetReps: boolean = false) {
        this.IsRunning = true;
        if (resetReps) {
            this.activeExerciseInSetIndex = 0;
            this.resetReps();
        }
        this.startTimedRep();
    }
    stopWorkout() {
        this.IsRunning = false;
        this.resetReps();
        this.stopRepTimer();
        this.stopRestTimer();
        this.remainingTimedRestSec = 0;
        this.remainingTimedRepSec = 0;
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
        this.audioService.playStartWorkout();
        this.stopRepTimer();
        this.remainingTimedRepSec = this.activeRep.seconds;
        if (this.remainingTimedRepSec) {
            const interval = Math.max(100, this.activeRep.seconds);
            this.timedRepTimer = setInterval(() => {
                this.remainingTimedRepSec -= interval/1000;
                if (this.remainingTimedRepSec <= 0) {
                    this.stopRepTimer();
                    this.nextRep(true);
                }
            }, interval);
        }
    }

    private stopRepTimer() {
        if (this.timedRepTimer) {
            clearInterval(this.timedRepTimer);
        }
    }

    private startTimedRest(callbackAction: () => void) {
        this.audioService.playStartWorkout();
        this.stopRestTimer();
        this.remainingTimedRestSec = this.secToRestAfterCurrentRep;
        if (this.remainingTimedRestSec) {
            const interval = Math.max(100, this.secToRestAfterCurrentRep);
            this.timedRestTimer = setInterval(() => {
                this.remainingTimedRestSec -= interval/1000;
                if (this.remainingTimedRestSec <= 0) {
                    this.stopRestTimer();
                    callbackAction();
                }
            }, interval);
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
            if (shouldRest && this.exercises.length === 1) {
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
            // this.setRepsCompleteState(this.activeExercise.id, this.activeRepIndex);
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
        isLast: boolean = false,
        rep: Rep = null,
    ) {
        const popover = await this.popoverCtrl.create({
            component: ChooseExerciseActionPopoverComponent,
            event,
            componentProps: {
                canSwap: !isLast,
                isExpanded: this.expanded,
                rep,
                isMinReps: this.isMinReps,
                isMaxReps: this.isMaxReps,
                actions,
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
                            // this.viewSet(index);
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
          header: 'Edit Name',
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

}

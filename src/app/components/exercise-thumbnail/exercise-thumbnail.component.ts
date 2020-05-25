import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PopoverController, AlertController, ModalController} from '@ionic/angular';
import { ExerciseBean } from 'src/app/models/Exercise';
import { DisplayMode, WeightUnit, RunningState, ExerciseAction } from 'src/app/models/enums';
import { Set, IRunningSet } from 'src/app/models/Set';
import { ExerciseThumbnailPopoverComponent } from '../exercise-thumbnail-popover/exercise-thumbnail-popover.component';
import { ChooseExerciseActionPopoverComponent } from '../choose-exercise-action-popover/choose-exercise-action-popover.component';
import { ExerciseVariationPopoverComponent } from '../exercise-variation-popover/exercise-variation-popover.component';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { IAppState } from 'src/app/store/state/app.state';
import { getWorkoutDay } from 'src/app/store/selectors/workoutDays.selectors';
import { getExerciseSet } from 'src/app/store/selectors/exerciseSets.selectors';
import { DeleteExercise, UpdateExercise, AddSet, DeleteSet,
} from 'src/app/store/actions/exercises.actions';
import { SwitchExercisesInSet, UpdateExerciseSet } from 'src/app/store/actions/exerciseSets.actions';
import { StartExercise, ExerciseCompleted } from 'src/app/store/actions/workoutDays.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { Router, NavigationExtras } from '@angular/router';
import { AudioServiceProvider } from 'src/app/providers/audio-service/audio-service';
import { getRunningWorkoutDayState } from 'src/app/store/selectors/data.selectors';
import { IRunningWorkoutDayState } from 'src/app/store/state/data.state';
import { ExerciseDetailModalComponent } from '../exercise-detail-modal/exercise-detail-modal/exercise-detail-modal.component';
import { Animation, AnimationController } from '@ionic/angular';
import { ExerciseSetBean } from 'src/app/models/ExerciseSet';

const MAXSETS = 5;
const MINSETS = 1;

@Component({
    selector: 'app-exercise-thumbnail',
    templateUrl: './exercise-thumbnail.component.html',
    styleUrls: ['./exercise-thumbnail.component.scss'],
})
export class ExerciseThumbnailComponent implements OnInit, OnDestroy, AfterViewInit {
    private activeSetIndex = 0;
    private activeExerciseInSetIndex = 0;
    private remainingSetTime = 0.0;
    private timedSetTimer = null;
    private restTime = 0;
    private remainingSetRestTime = 0;
    private timedSetRestTimer = null;
    private logger: Logger;
    private isInRunningMode = false;
    private isInEditMode = false;
    private mode: DisplayMode = DisplayMode.Display;
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private exerciseSet: ExerciseSetBean;
    exercises: ExerciseBean[];
    images: ExerciseMediaBean[];
    runningExercises: Map<string, IRunningSet[]>;
    restBetweenSets = 0;
    restAfterExercise = 0;
    isEditSetExpanded = false;
    isViewSetExpanded = false;
    displayMode = DisplayMode;
    weightUnit = WeightUnit;
    setProgressBar: Animation;
    restProgressBar: Animation;
    @Input() isVolumeMuted: boolean;
    @Input() workoutId: string;
    @Input() dayId: string;
    @Input() exerciseSetId: string;
    @Input() exerciseSetIndex: number;
    @ViewChild('activeSetProgresssBar', {static: false, read: ElementRef }) activeSetProgresssBar: ElementRef;
    @ViewChild('activeRestProgresssBar', {static: false, read: ElementRef }) activeRestProgresssBar: ElementRef;
    private get activeExercise(): ExerciseBean {
        return this.exercises[this.activeExerciseInSetIndex];
    }

    get isPrevSetAvailable(): boolean {
        const isPrevAvail =
            this.activeSetIndex > 0 ||
            this.lastCompletedMultiSetExerciseIndex > -1;
        return isPrevAvail;
    }

    get timedRestRemaining(): number { return this.remainingSetRestTime; }

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

    get RunningExercisesSets(): Map<string, IRunningSet[]> {
        if (!this.runningExercises) {
            this.runningExercises = this.createRunningExercisesMap();
        }
        return this.runningExercises;
    }
    set RunningExercisesSets(map: Map<string, IRunningSet[]>) {
        this.runningExercises = map;
    }

    createRunningExercisesMap(): Map<string, IRunningSet[]> {
        const map = new Map();
        this.resetSets(map);
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
        .subscribe(data => {
            this.logger.debug('ngOnInit', 'getExerciseSet', data);
            this.exerciseSet = data.set;
            this.exercises = data.exercises;
            this.images = data.media;
            if (this.exercises[0]) {
                this.restBetweenSets = data.set.restBetweenSets;
                this.restAfterExercise = data.set.restAfterExercise;
            }
            this.RunningExercisesSets = this.createRunningExercisesMap();
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
        // this.logger.debug('ionViewDidEnter', this.exerciseSetId);
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
    selectSetAction(event: Event, exercise: ExerciseBean, setIndex: number, set: Set) {
        this.presentActionsPopover(event, exercise, setIndex, [
            ExerciseAction.EditSet,
            ExerciseAction.AddSet,
            ExerciseAction.DeleteSet,
        ], false, set);
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

    exerciseChanged(exeIndex: number, value: string, prop: string) {
        if (this.exercises[exeIndex][prop] === value) {
            return;
        }
        this.logger.debug('exerciseChanged', `${prop} to ${value}`);
        const newExe = ExerciseBean.copy(this.exercises[exeIndex]);
        newExe[prop] = value;
        this.store.dispatch(new UpdateExercise({
            exercise: newExe
        }));
    }
    exerciseSetChanged(value: number, prop: string) {
        this.logger.debug('exerciseSetChanged', `${prop} to ${value}`);
        const newExeSet = ExerciseSetBean
            .copy(this.exerciseSet, {
                restBetweenSets: this.restBetweenSets,
                restAfterExercise: this.restAfterExercise
            });
        this.store.dispatch(new UpdateExerciseSet({
            exerciseSet: newExeSet
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
        return this.remainingSetRestTime > 0 && this.IsRunning;
    }

    getRunningExerciseSet(setIndex: number, exerciseId: string): IRunningSet {
        let set: IRunningSet = { isActive: false, isComplete: false }
        if (this.RunningExercisesSets.has(exerciseId)) {
            const sets = this.RunningExercisesSets.get(exerciseId)
            if (sets.length && sets.length > setIndex) {
                set = sets[setIndex];
            }
        }
        return set;
    }

    isSetComplete(setIndex: number, exerciseId: string): boolean {
        return this.getRunningExerciseSet(setIndex, exerciseId).isComplete;
    }
    isSetActive(setIndex: number, exerciseId: string): boolean {
        return this.getRunningExerciseSet(setIndex, exerciseId).isActive;
    }

    getSetClass(index: number, exerciseId: string): string {
        let cls = '';
        if (this.IsRunning) {
            cls = 'divSet';
            if (this.isSetActive(index, exerciseId)) {
                cls += ' divActive';
            }
            cls += ' divNonActive';
        }
        return cls;
    }

    getTimedSetStyle(setIndex: number, exerciseId: string): { animation: string} {
        const animation = {
            animation: `${this.isSetActive(setIndex, exerciseId) ? 4 : 0}s linear infinite fadeinout`
        };
        return animation;
    }

    getRunningSetTime(setIndex: number, exerciseId: string) {
        const set = this.getRunningExerciseSet(setIndex, exerciseId);
        if (set.isComplete) {
            return `${set.time}`;
        }
        if (set.isActive) {
            return `${Math.ceil(this.remainingSetTime)}`;
        }
        return `${set.time}`;
    }

    get RemainingTimedRest() {
        return `${Math.ceil(this.timedRestRemaining)}`;
    }

    startWorkout() {
        this.IsRunning = true;
        this.activeExerciseInSetIndex = 0;
        this.resetSets(this.RunningExercisesSets);
        this.runNextSet();
    }
    stopWorkout() {
        if (this.exercises && this.exercises.length) {
            this.IsRunning = false;
            this.resetSets(this.RunningExercisesSets);
            this.stopSetTimer();
            this.stopRestTimer();
            this.remainingSetRestTime = 0;
            this.remainingSetTime = 0;
        }
    }

    private resetSets(map: Map<string, IRunningSet[]>) {
        this.exercises.forEach(e => map.set(e.id, e.sets.map(r => (
            { isActive: false, isComplete: false, time: r.time }
        ))));
    }

    private startTimedSet() {
        this.stopSetTimer();
        this.remainingSetTime = this.ActiveSetTime;
        if (this.remainingSetTime) {
            setTimeout(() => {
                this.animateProgressBar(this.remainingSetTime, this.activeSetProgresssBar.nativeElement);
            }, 0);
            const interval = 1000;
            const intervalStep = interval / 1000;
            this.timedSetTimer = setInterval(() => {
                this.remainingSetTime -= intervalStep;
                if (this.remainingSetTime <= 0) {
                    this.stopSetTimer();
                    this.stopAnimatedProgressBar(this.setProgressBar);
                    this.runNextSet();
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

    animateProgressBar(remainingTimedSetTime: number, element) {
        this.setProgressBar = this.animationCtrl.create()
        .addElement(element)
        .duration(remainingTimedSetTime*1000)
        .fromTo('transform', 'scalex(0)', 'scalex(1)')
        this.setProgressBar.play();
    }

    private stopSetTimer() {
        if (this.timedSetTimer) {
            clearInterval(this.timedSetTimer);
        }
        this.remainingSetTime = 0;
        this.stopAnimatedProgressBar(this.setProgressBar);
    }
    private stopRestTimer() {
        if (this.timedSetRestTimer) {
            clearInterval(this.timedSetRestTimer);
        }
        this.remainingSetRestTime = 0;
        this.stopAnimatedProgressBar(this.restProgressBar);
    }
    private startTimedRest(callbackAction: () => void) {
        this.stopRestTimer();
        this.remainingSetRestTime = this.restTime;
        if (this.remainingSetRestTime) {
            setTimeout(() => {
                this.animateProgressBar(this.remainingSetRestTime, this.activeRestProgresssBar.nativeElement);
            }, 0);
            const interval = 1000;
            const intervalStep = interval / 1000;
            this.timedSetRestTimer = setInterval(() => {
                this.remainingSetRestTime -= intervalStep;
                if (this.remainingSetRestTime <= 0) {
                    this.stopRestTimer();
                    this.stopAnimatedProgressBar(this.restProgressBar);
                    return new callbackAction();
                }
            }, interval);
        }
    }

    runPrevSet() {
        this.stopSetTimer();
        this.remainingSetTime = 0;
        this.inactivateCurrentExercisesSet();
        this.uncompleteCurrentExercisesSet();
        this.startTimedSet();
    }
    inactivateCurrentExercisesSet() {
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        exerciseIds.forEach(id => {
            const set = this.getRunningExerciseSet(this.activeSetIndex, id);
            if (set.isActive){
                set.isActive = false;
            }
        });
    }
    uncompleteCurrentExercisesSet() {
        let skip = false;
        if (this.lastCompletedMultiSetExerciseIndex === -1) {
            this.activeSetIndex--;
        }
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(0, this.lastCompletedMultiSetExerciseIndex + 1).reverse();
        exerciseIds.forEach((id, index) => {
            const set = this.getRunningExerciseSet(this.activeSetIndex, id);
            if ((index === 0 || !set.time) && !skip) {
                set.isComplete = false;
                set.isActive = true;
            }
            skip = skip || !!set.time;
        });
    }

    skipRest() {
        this.remainingSetRestTime = 0;
        this.remainingSetTime = 0;
    }

    runNextSet(withRest = true) {
        this.stopSetTimer();
        this.remainingSetTime = 0;
        this.nextSet(withRest);
    }

    nextSet(withRest = true) {
        this.completeCurrentSets();
        if (this.activateNextSets()) {
            this.startTimedSet();
        } else {
            if (this.exercises[0].sets.length > this.activeSetIndex + 1) {
                this.restTime = this.restBetweenSets;
                if (withRest) {
                    this.startTimedRest(() => {
                        this.activeSetIndex ++;
                        this.nextSet();
                    });
                } else {
                    this.activeSetIndex ++;
                    this.nextSet();
                }
            } else {
                this.stopSetTimer();
                this.restTime = this.restAfterExercise;
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

    private completeCurrentSets() {
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        exerciseIds.forEach(id => {
            const set = this.getRunningExerciseSet(this.activeSetIndex, id);
            if (set.isActive) {
                set.isComplete = true;
                set.isActive = false;
            }
        });
    }

    private activateNextSets() {
        let activated = false;
        let skip = false;
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        exerciseIds.forEach((id, index) => {
            const set = this.getRunningExerciseSet(this.activeSetIndex, id);
            if ((index === 0 || !set.time) && !skip) {
                set.isActive = true;
                activated = true;
            }
            skip = skip || !!set.time;
        });
        return activated;
    }

    get lastCompletedMultiSetExerciseIndex(): number {
        let lastCompleted = this.exercises.map(exe=>exe.id).reverse().findIndex((id) => {
            const set = this.getRunningExerciseSet(this.activeSetIndex, id);
            return set.isComplete;
        });
        if (lastCompleted > -1) {
            lastCompleted = this.exercises.length - 1 - lastCompleted;
        }
        return lastCompleted;
    }


    get ActiveSetTime(): number {
        const exerciseIds = this.exercises.map(exe=>exe.id).slice(this.lastCompletedMultiSetExerciseIndex + 1);
        const set = this.getRunningExerciseSet(this.activeSetIndex, exerciseIds[0]);
        return set.time;
    }

    addSet(index: number) {
        if (!this.isMaxSets) {
            this.exercises.forEach(exe => {
                this.store.dispatch(new AddSet({
                    exerciseId: exe.id,
                    copyFromIndex: index
                }));
            });
        }
    }

    toggleViewSet() {
        this.isViewSetExpanded = !this.isViewSetExpanded;
    }
    deleteSet(index: number) {
        if (!this.isMinSets) {
            this.exercises.forEach(exe => {
                this.store.dispatch(new DeleteSet({
                    exerciseId: exe.id,
                    indexToDelete: index
                }));
            });
        }
    }

    get isMaxSets(): boolean {
        return this.exercises[0].sets.length === MAXSETS;
    }

    get isMinSets(): boolean {
        return this.exercises[0].sets.length === MINSETS;
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

    async presentPopover(event: Event, set: Set, setIndex: number, exeId: string) {
        const popover = await this.popoverCtrl.create({
            component: ExerciseThumbnailPopoverComponent,
            event,
            componentProps: { set, exeId, setIndex }
        });
        popover.present();
    }
    async presentActionsPopover(
        event: Event,
        exercise: ExerciseBean,
        index: number,
        actions: ExerciseAction[],
        isLast?: boolean,
        set?: Set,
    ) {
        const popover = await this.popoverCtrl.create({
            component: ChooseExerciseActionPopoverComponent,
            event,
            componentProps: {
                canSwap: !isLast,
                isViewSetExpanded: this.isViewSetExpanded,
                set,
                isMinSets: this.isMinSets,
                isMaxSets: this.isMaxSets,
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
                        this.presentPopover(event, set, index, exercise.id);
                        break;
                    case ExerciseAction.AddSet:
                        this.addSet(index);
                        break;
                    case ExerciseAction.DeleteSet:
                        this.deleteSet(index);
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

    editExerciseName(event: any, exe: ExerciseBean, exeIndex: number) {
        event.stopPropagation();
        this.presentAlertPrompt(exe, exeIndex);
    }

    async presentAlertPrompt(exe: ExerciseBean, exeIndex: number) {
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
                this.exerciseChanged(exeIndex, data.text, 'name');
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

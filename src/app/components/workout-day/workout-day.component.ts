import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { DisplayMode, RunningState } from '../../models/enums';
import { IAppState } from 'src/app/store/state/app.state';
import {
  StartExercise,
  UpdateWorkoutDay,
  ReorderExerciseSets,
  StopExercise,
  RepeatExercise,
  StartFirstExercise,
  ChangeDisplayMode,
} from 'src/app/store/actions/workoutDays.actions';
import { getWorkoutDay } from 'src/app/store/selectors/workoutDays.selectors';
import { takeUntil } from 'rxjs/operators';
import { Logger, LoggingService } from 'ionic-logging-service';
import { IonList, AlertController, IonFab } from '@ionic/angular';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { getRunningWorkoutDayState } from 'src/app/store/selectors/data.selectors';
import { IRunningWorkoutDayState } from 'src/app/store/state/data.state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-day',
  templateUrl: './workout-day.component.html',
  styleUrls: ['./workout-day.component.scss'],
})
export class WorkoutDayComponent implements OnInit, OnDestroy, AfterViewInit {
  private logger: Logger;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  exerciseSets: string[];
  name: string;
  repeatsCount: number;
  repeatsCompleted: number;
  customPopoverOptions: any = {
    header: 'Numner of times to repeat',
  };
  @Input() workoutId: string;
  @Input() dayId: string;
  @ViewChild(IonList, { read: ElementRef, static: false }) list: ElementRef;
  @ViewChild('fabWorkout', {static: true}) fabWorkout?: IonFab;
  @ViewChild('fabEdit', {static: true}) fabEdit?: IonFab;

  constructor(
    loggingService: LoggingService,
    private store: Store<IAppState>,
    private dataService: DataServiceProvider,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.logger = loggingService.getLogger('App.WorkoutDayComponent');
  }

  get nameTitle(): string {
    if (this.repeatsCount > 1) {
      if (this.IsWorkoutMode) {
        return `${this.name} (${this.repeatsCompleted + 1}/${this.repeatsCount})`;
      } else {
        return `${this.name} (0/${this.repeatsCount})`;
      }
    } else {
      return this.name;
    }
  }
  private displayMode: DisplayMode = DisplayMode.Display;
  get IsEditMode() { return this.displayMode === DisplayMode.Edit; }
  get IsWorkoutMode() { return this.displayMode === DisplayMode.Workout; }
  get IsDisplayMode() { return this.displayMode === DisplayMode.Display; }

  ngOnInit() {
    this.handleAnyRunningWorkoutChanges();
  }

  private handleAnyRunningWorkoutChanges() {
    this.store.select(getRunningWorkoutDayState)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (runningDayState) => {
        if (runningDayState) {
          if (runningDayState.dayId === this.dayId) {
            this.handleRunningWorkoutDayStateChange(runningDayState);
          }
          else {
            // any other day should stop running
            this.stopWorkout();
          }
        }
      });
  }

  private handleThisWorkoutDayChanges() {
    this.store.select(getWorkoutDay(this.dayId))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(workoutDay => {
        if (workoutDay) {
          this.logger.debug('ngOnInit', `${this.dayId} getWorkoutDay`, workoutDay);
          const addedSet = workoutDay.exerciseSets && this.exerciseSets &&
            workoutDay.exerciseSets.length > this.exerciseSets.length;
          this.exerciseSets = workoutDay.exerciseSets;
          this.name = workoutDay.name;
          this.repeatsCount = workoutDay.repeatsCount;
          this.setDisplayMode(workoutDay.displayMode);
          if (addedSet) {
            setTimeout(() => this.scrollToExerciseSet(this.exerciseSets.length - 1), 500);
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.handleThisWorkoutDayChanges();
  }

  setDisplayMode(mode: DisplayMode) {
    switch (mode) {
      case DisplayMode.Display:
        if (this.displayMode !== mode) {
          this.logger.debug('setDisplayMode', `setting Display display mode to day ${this.dayId}`);
          this.displayMode = mode;
          this.fabWorkout.close();
          this.fabEdit.close();
        }
        break;
      case DisplayMode.Workout:
        if (this.displayMode !== mode) {
          this.logger.debug('setDisplayMode', `setting Workout display mode to day ${this.dayId}`);
          this.displayMode = mode;
          this.fabEdit.close();
          this.fabWorkout.activated = true;
        }
        break;
      case DisplayMode.Edit:
        if (this.displayMode !== mode) {
          this.logger.debug('setDisplayMode', `setting Edit display mode to day ${this.dayId}`);
          this.displayMode = mode;
          this.fabWorkout.close();
          this.fabEdit.activated = true;
        }
        break;
    }
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      const setId = params.setId;
      if (setId) {
        const index = this.exerciseSets.findIndex(setId);
        if (index) {
          this.logger.debug('ionViewDidEnter', `scrolling to set id ${setId}`);
          setTimeout(() => this.scrollToExerciseSet(index), 500);
        }
      }
    }).unsubscribe();
  }

  editWorkout(event: any) {
    event.stopPropagation();
    this.presentAlertPrompt(this.name, this.repeatsCount);
  }
  async presentAlertPrompt(name: string, repeats: number) {
    const alert = await this.alertController.create({
      header: 'Workout Day',
      subHeader: 'Edit name and repeat number',
      inputs: [{
        name: 'text',
        id: 'text',
        type: 'textarea',
        value: name,
        placeholder: 'Enter workout day name here...'
      },
      {
        name: 'number',
        id: 'number',
        type: 'number',
        value: repeats,
        min:1, max:10,
        placeholder: 'Enter number of times to repeat'
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
            this.logger.debug('presentAlertPrompt', 'saving text', data.text, data.number);
            this.name = data.text,
            this.repeatsCount = +data.number || 1;
            this.workoutDayChanged();
          } else {
            return false;
          }
        }
      }
      ]
    });

    alert.present();
  }

  startWorkoutToggler() {
    if (this.fabEdit.activated) {
      return;
    }
    switch (this.displayMode) {
      case DisplayMode.Display:
        this.displayMode = DisplayMode.Workout;
        this.dispatchStartExercise();
        break;
      case DisplayMode.Workout:
        this.displayMode = DisplayMode.Display;
        this.dispatchStopExercise()
        break;
      case DisplayMode.Edit:
        // this should never happen
        this.logger.error('startWorkoutToggler', 'should not be able to toggle workout while in edit mode');
        // this.fabEdit.close();
        break;
    }
  }
  editWorkoutToggler() {
    if (this.fabWorkout.activated) {
      return;
    }
    switch (this.displayMode) {
      case DisplayMode.Display:
        this.displayMode = DisplayMode.Edit;
        break;
      case DisplayMode.Edit:
        this.displayMode = DisplayMode.Display;
        break;
      case DisplayMode.Workout:
        this.logger.error('editWorkoutToggler', 'should not be able to toggle edit while in workout mode');
        // this.fabWorkout.close();
        break;
    }
    this.DispatchChangeDisplayMode();
  }
  selectExerciseToAdd(event: any) {
    event.stopPropagation();
    this.router.navigate(['select-exercise'], { relativeTo: this.route });
  }

  stopWorkout() {
    if (this.displayMode === DisplayMode.Workout) {
      this.displayMode = DisplayMode.Display;
      this.fabWorkout.close();
    }
  }

  stopRunning() {
    this.displayMode = DisplayMode.Display;
    this.dispatchStopExercise();
  }

  dispatchStartExercise() {
    this.store.dispatch(new StartFirstExercise({
      workoutId: this.workoutId,
      dayId: this.dayId,
      runningExerciseSetIndex: 0,
      runningState: RunningState.Running,

    }));
  }
  dispatchStopExercise() {
    this.store.dispatch(new StopExercise({
      workoutId: this.workoutId,
      dayId: this.dayId,
      repeatsCompleted: 0,
      runningState: RunningState.NA,
      runningExerciseSetIndex: 0,
    }));
  }
   DispatchChangeDisplayMode() {
    this.store.dispatch(new ChangeDisplayMode({
      workoutId: this.workoutId,
      dayId: this.dayId,
      displayMode: this.displayMode,
    }));
  }

  private scrollToExerciseSet(index: number) {
    this.logger.debug('ngOnInit', 'need to scrollToExerciseSetIndex', index);
      const items = this.list.nativeElement.children[0].children;
      this.dataService.scrollToItem(items, index);
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy', this.dayId);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleRunningWorkoutDayStateChange(day: IRunningWorkoutDayState) {
    this.logger.debug('handleSelectedWorkoutDayStateChange', day);
      if (day.runningState === RunningState.Completed) {
        if (day.runningExerciseSetIndex + 1 < this.exerciseSets.length) {
          this.store.dispatch(new StartExercise({
            workoutId: this.workoutId,
            dayId: this.dayId,
            runningExerciseSetIndex: day.runningExerciseSetIndex + 1,
            runningState: RunningState.Running,
          }));
          setTimeout(() => this.scrollToExerciseSet(day.runningExerciseSetIndex + 1), 200);
        } else if (this.repeatsCount > 1 && day.repeatsCompleted + 1 < this.repeatsCount) {
          this.store.dispatch(new RepeatExercise({
            workoutId: this.workoutId,
            dayId: this.dayId,
            repeatsCompleted: day.repeatsCompleted + 1,
            runningState: RunningState.Running,
            runningExerciseSetIndex: 0,
          }));
          setTimeout(() => this.scrollToExerciseSet(0), 200);
        } else {
          // exeercise is done!
          this.dispatchStopExercise();
        }
      }
  }

  workoutDayChanged() {
    this.store.dispatch(new UpdateWorkoutDay({
      dayId: this.dayId,
      name: this.name,
      repeatsCount: this.repeatsCount,
    }));
  }

  reorderItems(event: CustomEvent<ItemReorderEventDetail>) {
    const from = event.detail.from;
    const to = event.detail.to;
    this.logger.info('reorderItems', `Moving day from ${from} to ${to}`);
    this.store.dispatch(new ReorderExerciseSets({
      dayId: this.dayId,
      fromIndex: from < to ? from : to,
      toIndex: to > from ? to : from
    }));
    event.detail.complete(true);
  }
}

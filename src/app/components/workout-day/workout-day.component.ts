import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { WorkoutDayBean } from '../../models/WorkoutDay';
import { DisplayMode, RunningState } from '../../models/enums';
import { IAppState } from 'src/app/store/state/app.state';
import {
  StartExercise,
  UpdateWorkoutDay,
  ReorderExerciseSets,
  StopExercise,
  // ResetExerciseSetScrollIntoView,
  RepeatExercise,
  // ChangeDisplayMode,
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
export class WorkoutDayComponent implements OnInit, OnDestroy {
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
    this.store.select(getWorkoutDay(this.dayId))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(workoutDay => {
        if (workoutDay) {
          this.logger.debug('ngOnInit', `${this.dayId} getWorkoutDay`, workoutDay);
          this.exerciseSets = workoutDay.exerciseSets;
          this.name = workoutDay.name;
          this.repeatsCount = workoutDay.repeatsCount;
          // this.displayMode = workoutDay.displayMode;
          // if (this.displayMode === DisplayMode.Edit) {
          //   // this.fabEdit.activated = true;
          // } else {
          //   //this.fabEdit.close();
          // }
          // this.repeatsCompleted = workoutDay.repeatsCompleted;
          // this.handleSelectedWorkoutDayStateChange(workoutDay);
        }
      });

    this.store.select(getRunningWorkoutDayState)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async runningDayState => {
        if (runningDayState) {
          if (runningDayState.dayId === this.dayId) {
            this.handleRunningWorkoutDayStateChange(runningDayState);
          } else {
            // any other day should stop running
            this.stopWorkout();
          }
      }
    });
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
            this.name = data.text, this.repeatsCount = data.number || 1;
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
    switch (this.displayMode) {
      case DisplayMode.Display:
        //   this.store.dispatch(new UpdateWorkouts());
        this.displayMode = DisplayMode.Workout;
        this.store.dispatch(new StartFirstExercise({
          workoutId: this.workoutId,
          dayId: this.dayId,
        }));
        break;
      case DisplayMode.Workout:
        this.displayMode = DisplayMode.Display;
        this.dispatchStopExercise()
        break;
    }
  }
  editWorkoutToggler() {
    switch (this.displayMode) {
      case DisplayMode.Display:
        this.displayMode = DisplayMode.Edit;
        break;
      case DisplayMode.Edit:
        this.displayMode = DisplayMode.Display;
        break;
    }
    this.DispatchChangeDisplayMode();
  }
  selectExerciseToAdd(event: any) {
    event.stopPropagation();
    this.router.navigate(['select-exercise'], { relativeTo: this.route });
  }
   dispatchStopExercise() {
    this.store.dispatch(new StopExercise({
      workoutId: this.workoutId,
      dayId: this.dayId,
    }));
  }

  stopWorkout() {
    // switch (this.DisplayMode) {
    //   case DisplayMode.Workout:
        this.displayMode = DisplayMode.Display;
        this.fabWorkout.close();
        // break;
      // case DisplayMode.Display:
      // case DisplayMode.Edit:
      //   break;
    // }
  }

  stopRunning() {
    this.displayMode = DisplayMode.Display;
    this.dispatchStopExercise();
  }

   DispatchChangeDisplayMode() {
    this.store.dispatch(new ChangeDisplayMode({
      workoutId: this.workoutId,
      dayId: this.dayId,
      displayMode: this.displayMode,
    }));
  }

  private scrollToExerciseSet(scrollToExerciseSetIndex: number) {
    this.logger.debug('ngOnInit', 'need to scrollToExerciseSetIndex', scrollToExerciseSetIndex);
    // setTimeout(() => {
      const items = this.list.nativeElement.children[0].children;
      const set = items[scrollToExerciseSetIndex];
      if (!set) { return; }
      if (this.dataService.isIos) {
        // aligned to end of view
        set.scrollIntoView(false);
      } else {
        set.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    // }, 100);
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy', `${this.dayId} onDestroy`);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handleRunningWorkoutDayStateChange(day: IRunningWorkoutDayState) {
    this.repeatsCompleted = day.repeatsCompleted;
    this.logger.debug('handleSelectedWorkoutDayStateChange', day);
    // switch (day.displayMode) {
      // case DisplayMode.Edit:
      // case DisplayMode.Display:
        // if (day.scrollToExerciseSet && day.scrollToExerciseSetIndex >= 0) {
        //   this.scrollToExerciseSet(day.scrollToExerciseSetIndex);
        //   this.store.dispatch(new ResetExerciseSetScrollIntoView({ dayId: this.dayId }));
        // }
      //   break;
      // case DisplayMode.Workout:
        if (day.runningState === RunningState.Completed) {
          if (day.runningExerciseSetIndex + 1 < this.exerciseSets.length) {
            this.scrollToExerciseSet(day.runningExerciseSetIndex + 1);
            this.store.dispatch(new StartExercise({
              workoutId: this.workoutId,
              dayId: this.dayId,
              runningExerciseSetIndex: day.runningExerciseSetIndex + 1,
            }));
          } else if (this.repeatsCount > 1 && day.repeatsCompleted + 1 < this.repeatsCount) {
            this.scrollToExerciseSet(0);
            this.store.dispatch(new RepeatExercise({
              workoutId: this.workoutId,
              dayId: this.dayId,
              repeatsCompleted: day.repeatsCompleted + 1,
            }));
          } else {
            // exeercise is done!
            this.dispatchStopExercise();
            // this.store.dispatch(new ChangeDisplayMode({
            //   workoutId: this.workoutId,
            //   dayId: this.dayId,
            //   displayMode: DisplayMode.Display,
            // }));
          }
        }
        // else if (day.runningState === RunningState.Running) {
        //   // this.scrollToExerciseSet(day.runningExerciseSetIndex);
        // }
        // break;
    // }
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

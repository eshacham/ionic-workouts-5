import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides as Slides, IonFab } from '@ionic/angular';
import { IAppState } from 'src/app/store/state/app.state';
import { WorkoutDayBean } from '../../models/WorkoutDay';
import { UnselectWorkout } from 'src/app/store/actions/workouts.actions';
import {
  SelectWorkoutDay,
  AddWorkoutDay,
  Direction,
  // StartFirstExercise,
  // ChangeDisplayMode,
  DeleteWorkoutDay,
  MoveWorkoutDay,
  // StopExercise,
  // SetExerciseSetInWorkoutDay
} from 'src/app/store/actions/workoutDays.actions';
import { getCurrentWorkout } from 'src/app/store/selectors/workouts.selectors';
// import { getWorkoutDay } from 'src/app/store/selectors/workoutDays.selectors';
import { Guid } from 'guid-typescript';
// import { DisplayMode } from 'src/app/models/enums';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DisplayMode } from 'src/app/models/enums';
// import { UpdateWorkouts } from 'src/app/store/actions/data.actions';

@Component({
  selector: 'app-workout-days',
  templateUrl: './workout-days.page.html',
  styleUrls: ['./workout-days.page.scss'],
})
export class WorkoutDaysPage implements OnInit, OnDestroy {
  private logger: Logger;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  days: string[];
  name: string;
  workoutId: string;
  activeDayIndex = 0;
  firstSelectedDayId: string;
  @ViewChild('slider', {static: false}) slides?: Slides;
  slideOpts = {
    autoHeight: false,
    pagination: {
      type: 'bullets',
      clickable: false,
      el: '.swiper-pagination',
      cssMode: true,
      longSwipes: false,
    },
    noSwipingSelector: 'ion-range, ion-reorder, ion-fab, ion-button'
  };
  @ViewChild('fabEdit', {static: true}) fabEdit?: IonFab;
  constructor(
    loggingService: LoggingService,
    // private route: ActivatedRoute,
    private router: Router,
    // private cdr: ChangeDetectorRef,
    private store: Store<IAppState>) {
    this.logger = loggingService.getLogger('App.WorkoutDaysPage');
  }
  get activeDayId(): string {
    return this.days ? this.days[this.activeDayIndex] : null;
  }

  ngOnInit() {
    this.store.select(getCurrentWorkout)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (data) => {
        if (data.workout) {
          this.workoutId = data.workout.id;
          this.days = data.workout.days;
          this.name = data.workout.name;
          this.logger.debug('ngOnInit', `${this.workoutId} - getCurrentWorkout`, data);
          this.firstSelectedDayId = data.selectedDayId;
          if (this.slides) {
            this.MaybeSlideToSelectedDay();
          }
        } else {
          this.logger.info('ngOnInit', `${this.workoutId} - not in state`, data);
          this.router.navigate(['']);
        }
      });
  }
  ionViewDidEnter() {
    this.MaybeSlideToSelectedDay();

  //   this.logger.debug('ionViewDidEnter', 'current day id', this.activeDayId);
  //   this.store.select(getWorkoutDay(this.activeDayId))
  //     .pipe(take(1))
  //     .subscribe(workoutDay => {
  //       if (workoutDay && workoutDay.scrollToExerciseSetIndex) {
  //         this.logger.debug('ionViewDidEnter', 'need to scrollToExerciseSetId', workoutDay.scrollToExerciseSetId);
  //         this.store.dispatch(new SetExerciseSetInWorkoutDay({
  //           workoutId: this.workoutId,
  //           dayId: this.activeDayId,
  //           setId: workoutDay.scrollToExerciseSetId,
  //           scroll: true
  //         }));
  //       }
  //     });
  }
  private MaybeSlideToSelectedDay() {
    const selectedDayIndex = this.days.findIndex(day => day === this.firstSelectedDayId);
    this.logger.info('ionViewDidEnter', `${this.workoutId} - selectedDay ${this.firstSelectedDayId} on index ${selectedDayIndex}`);
    if (selectedDayIndex !== this.activeDayIndex) {
      this.logger.info('ngOnInit', `${this.workoutId} - sliding to last selected day index ${selectedDayIndex}`);
      // await new Promise(() => setTimeout(async () => {
      this.activeDayIndex = selectedDayIndex;
      this.slides.slideTo(selectedDayIndex, 0, false);
      // }, 1));
    }
    else {
      this.logger.info('ngOnInit', `${this.workoutId} - staying in current day ${this.firstSelectedDayId}`);
    }
  }
  async slideChanged() {
    if (this.slides && this.days) {
      this.activeDayIndex = await this.slides.getActiveIndex();
      this.logger.info('slideChanged', `${this.workoutId} slideChanged to index ${this.activeDayIndex}`);
      this.store.dispatch(new SelectWorkoutDay(
        {
          workoutId: this.workoutId,
          dayId: this.days[this.activeDayIndex]
        }));
    }
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy', this.workoutId);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new UnselectWorkout({
      selectedDayId: this.activeDayId
    }));
  }
  get IsLastDayActive() { return this.days && this.activeDayIndex === this.days.length - 1; }
  get IsFirstDayActive() { return this.activeDayIndex === 0; }
  get IsOneDayOnly() { return this.days && this.days.length === 1; }
  async addWorkoutDay(event: any) {
    event.stopPropagation();
    const newId = Guid.raw();
    const newDay = new WorkoutDayBean({
      id: newId,
      name: 'new workout day',
      exerciseSets: [],
      workoutId: this.workoutId,
      displayMode: DisplayMode.Edit,
    });
    const index = this.activeDayIndex;
    const islast = this.days.length - 1 === index;
    this.logger.info('addWorkoutDay', `${this.workoutId} insert at ${index}`);
    this.fabEdit.activated = true;
    this.store.dispatch(new AddWorkoutDay({
      workoutId: this.workoutId,
      day: newDay,
      index2AddFrom: index
    }));

    if (this.slides) {
      await this.slides.update();
      if (islast) {
        await this.slides.slideTo(this.days.length - 1);
      }
    }

  }
  async deleteWorkoutDay(event) {
    event.stopPropagation();
    this.store.dispatch(new DeleteWorkoutDay({
      dayId: this.activeDayId,
    }));
    // this.cdr.detectChanges();
    await this.slides.update();

  }
  moveForwardWorkoutDay(event: any) {
    event.stopPropagation();
    this.store.dispatch(new MoveWorkoutDay({ direction: Direction.Forward }));
  }
  moveBackWorkoutDay(event: any) {
    event.stopPropagation();
    this.store.dispatch(new MoveWorkoutDay({ direction: Direction.Backword }));
  }
  getWorkoutDayIndexById(id: string) {
    return this.days.findIndex(day => day === id);
  }

}
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides as Slides, IonFab, AnimationController } from '@ionic/angular';
import { IAppState } from 'src/app/store/state/app.state';
import { WorkoutDayBean } from '../../models/WorkoutDay';
import { UnselectWorkout } from 'src/app/store/actions/workouts.actions';
import {
  SelectWorkoutDay,
  AddWorkoutDay,
  Direction,
  DeleteWorkoutDay,
  MoveWorkoutDay,
} from 'src/app/store/actions/workoutDays.actions';
import { getCurrentWorkout } from 'src/app/store/selectors/workouts.selectors';
import { Guid } from 'guid-typescript';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DisplayMode, RunningState } from 'src/app/models/enums';
import { getRunningWorkoutDayState } from 'src/app/store/selectors/data.selectors';

@Component({
  selector: 'app-workout-days',
  templateUrl: './workout-days.page.html',
  styleUrls: ['./workout-days.page.scss'],
})
export class WorkoutDaysPage implements OnInit, OnDestroy, AfterViewInit {
  private logger: Logger;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  days: string[];
  name: string;
  workoutId: string;
  activeDayIndex = 0;
  firstSelectedDayId: string;
  isActiveDayRunning: boolean;
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
  @ViewChild('fabDaysActions', { read: ElementRef, static: false }) fabDaysActions: ElementRef;

  constructor(
    loggingService: LoggingService,
    private router: Router,
    private store: Store<IAppState>,
    private animationCtrl: AnimationController,
    ) {
    this.logger = loggingService.getLogger('App.WorkoutDaysPage');
  }
  get activeDayId(): string {
    return this.days ? this.days[this.activeDayIndex] : null;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.handleAnyRunningWorkoutChanges();
    this.handleCurrentWorkoutChanges();
  }

  private handleAnyRunningWorkoutChanges() {
    this.store.select(getRunningWorkoutDayState)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (runningDayState) => {
        this.isActiveDayRunning =
          runningDayState &&
          (runningDayState.runningState === RunningState.Completed ||
            runningDayState.runningState === RunningState.Running);
        if (this.isActiveDayRunning) {
          this.fabEdit.close();
        }
      });
  }

  private handleCurrentWorkoutChanges() {
    this.store.select(getCurrentWorkout)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (data) => {
        if (data.workout) {
          this.workoutId = data.workout.id;
          this.days = data.workout.days;
          this.name = data.workout.name;
          this.logger.debug('ngOnIhandleCurrentWorkoutChangesnit', `${this.workoutId} - getCurrentWorkout`, data);
          this.firstSelectedDayId = data.selectedDayId;
          if (this.slides) {
            this.MaybeSlideToSelectedDay('handleCurrentWorkoutChanges');
          }
        } else {
          this.logger.info('handleCurrentWorkoutChanges', `${this.workoutId} - not in state`, data);
          this.router.navigate(['']);
        }
      });
  }

  // ionViewDidEnter() {
  //   if (this.days) {
  //     this.MaybeSlideToSelectedDay('ionViewDidEnter');
  //   }
  // }

  private MaybeSlideToSelectedDay(origin: string) {
    const selectedDayIndex = this.days.findIndex(day => day === this.firstSelectedDayId);
    this.logger.info(`MaybeSlideToSelectedDay:${origin}`, `${this.workoutId} - selectedDay ${this.firstSelectedDayId} on index ${selectedDayIndex}`);
    if (selectedDayIndex !== this.activeDayIndex) {
      this.logger.info(`MaybeSlideToSelectedDay:${origin}`, `${this.workoutId} - sliding to last selected day index ${selectedDayIndex}`);
      this.activeDayIndex = selectedDayIndex;
      this.slides.slideTo(selectedDayIndex, 0, false);
    }
    else {
      this.logger.info(`MaybeSlideToSelectedDay:${origin}`, `${this.workoutId} - staying in current day ${this.firstSelectedDayId}`);
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

  activateDaysActions() {
    this.animateFab(this.fabDaysActions.nativeElement);
  }
  animateFab(e: Element) {
    this.createFabAnimation(e).play();
  }
  private createFabAnimation(e: Element) {
    return this.animationCtrl
    .create()
    .addElement(e)
    .fromTo('transform', 'scalex(0)', 'scalex(1)')
    .easing('ease-out')
    .duration(300);
  }
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
    // const islast = await this.slides.isEnd();//  this.days.length - 1 === index;
    this.logger.info('addWorkoutDay', `${this.workoutId} insert at ${index}`);
    this.fabEdit.activated = true;
    this.store.dispatch(new AddWorkoutDay({
      workoutId: this.workoutId,
      day: newDay,
      index2AddFrom: index
    }));

    // if (this.slides) {
      await this.slides.update();
      // if (islast) {
      setTimeout(() => this.slides.slideTo(index + 1), 0);
      // }
    // }

  }
  async deleteWorkoutDay(event) {
    event.stopPropagation();
    this.store.dispatch(new DeleteWorkoutDay({
      dayId: this.activeDayId,
    }));
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
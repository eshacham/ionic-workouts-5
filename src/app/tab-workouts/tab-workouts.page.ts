import { Store } from '@ngrx/store';
import { IonFab, PopoverController } from '@ionic/angular';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { WorkoutBean } from '../models/Workout';
import { DisplayMode } from '../models/enums';
import { IAppState } from '../store/state/app.state';
import { AddWorkout } from '../store/actions/workouts.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UpdateWorkouts } from '../store/actions/data.actions';
import { getWorkouts } from '../store/selectors/workouts.selectors';
import { Guid } from 'guid-typescript';
import { WorkoutDayBean } from '../models/WorkoutDay';
import { WorkoutSelectionPopoverComponent } from '../components/workout-selection-popover/workout-selection-popover.component';

@Component({
  selector: 'app-tab-workouts',
  templateUrl: 'tab-workouts.page.html',
  styleUrls: ['tab-workouts.page.scss']
})
export class TabWorkoutsPage implements OnInit, OnDestroy {

  @ViewChild('fabEdit', { static: true }) fabEdit: IonFab;

  workouts: WorkoutBean[];

  displayMode = DisplayMode;
  private mode: DisplayMode = DisplayMode.Display;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<IAppState>,
    private popoverCtrl: PopoverController,
    ) {
  }

  ngOnInit() {
    this.store.select(getWorkouts)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(workouts => {
        console.log('tab-workouts selectWorkouts', workouts);
        this.workouts = workouts;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get DisplayMode(): DisplayMode {
    return this.mode;
  }
  set DisplayMode(val: DisplayMode) {
    if (this.mode !== val) {
      this.mode = val;
      if (this.DisplayMode === DisplayMode.Display) {
        console.log('tab-workouts, set display mode', this.workouts);
        this.store.dispatch(new UpdateWorkouts());
      }
    }
  }

  editWorkouts() {
    switch (this.DisplayMode) {
      case DisplayMode.Display:
        this.DisplayMode = DisplayMode.Edit;
        break;
      case DisplayMode.Edit:
        this.DisplayMode = DisplayMode.Display;
        break;
    }
  }

  async addWorkout(event: any) {
    event.stopPropagation();
    const newWorkoutId = Guid.raw();
    const newDayId = Guid.raw();
    const workout = WorkoutBean.create({ id: newWorkoutId, dayId: newDayId });
    const day = WorkoutDayBean.create({ id: newDayId, workoutId: newWorkoutId });
    this.store.dispatch(new AddWorkout({ workout, day }));
  }

  async importWorkout(event: any) {
    event.stopPropagation();
    await this.presentPopover(event);
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: WorkoutSelectionPopoverComponent,
      event,
      componentProps: {
        workouts: this.workouts
      }
    });
    popover.present();
  }
}

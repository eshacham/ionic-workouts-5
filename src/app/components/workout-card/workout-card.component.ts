import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DisplayMode } from 'src/app/models/enums';
import { WorkoutBean } from 'src/app/models/Workout';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IAppState } from 'src/app/store/state/app.state';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { getWorkout } from 'src/app/store/selectors/workouts.selectors';
import { take } from 'rxjs/operators';
import { DeleteWorkout, ExportWorkout, UpdateWorkout } from 'src/app/store/actions/workouts.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { SelectWorkoutDay } from 'src/app/store/actions/workoutDays.actions';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent implements OnInit, OnDestroy {
  private logger: Logger;

  @Input() workoutId: string;
  @Input() displayMode: DisplayMode;

  private workout: WorkoutBean;
  private name: string;
  private description: string;

  constructor(
    loggingService: LoggingService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private clipboard: Clipboard,
    private dataService: DataServiceProvider,
    ) {
      this.logger = loggingService.getLogger('App.WorkoutCardComponent');
  }

  ngOnInit() {
    this.store.select(getWorkout(this.workoutId))
      .pipe(take(1))
      .subscribe(workout => {
        this.logger.debug('ngOnInit', 'getWorkout', workout);
        if (workout) {
          this.workout = workout;
          this.name = this.workout.name;
          this.description = this.workout.description;
        }
      });
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy', this.workout);
  }

  get IsEditMode() { return this.displayMode === DisplayMode.Edit; }
  get IsDisplayMode() { return this.displayMode === DisplayMode.Display; }

  async goToWorkoutDay(dayId: string) {
    this.logger.info('goToWorkoutDay', this.workoutId , dayId);
    this.store.dispatch(new SelectWorkoutDay({
      workoutId:  this.workoutId,
      dayId
    }));
    this.router.navigate(['workout'], {relativeTo: this.route});
  }

  get daysCount(): number {
    return (this.workout.days) ? this.workout.days.length : 0;
  }

  deleteWorkout() {
    this.store.dispatch(new DeleteWorkout({
      id: this.workoutId,
      days: this.workout.days
    }));
  }

  exportWorkout() {
    this.store.dispatch(new ExportWorkout({
      workoutId: this.workoutId,
    }));
  }

  workoutChanged() {
    const workout = { ...this.workout };
    workout.name = this.name;
    workout.description = this.description;
    this.store.dispatch(new UpdateWorkout({ workout }));
  }

  copyWorkoutId() {
    if (this.dataService.isMobile) {
      this.clipboard.copy(this.workoutId);
    }
  }

}

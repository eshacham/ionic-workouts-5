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
import { SelectWorkout, DeleteWorkout, ExportWorkout, UpdateWorkout } from 'src/app/store/actions/workouts.actions';
import { Logger, LoggingService } from 'ionic-logging-service';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent implements OnInit, OnDestroy {
  private logger: Logger;

  @Input() workoutId: string;
  @Input() displayMode: DisplayMode;

  private workoutBean: WorkoutBean;
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
          this.workoutBean = workout;
          this.name = this.workoutBean.name;
          this.description = this.workoutBean.description;
        }
      });
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy', this.workoutBean);
  }

  get IsEditMode() { return this.displayMode === DisplayMode.Edit; }
  get IsDisplayMode() { return this.displayMode === DisplayMode.Display; }

  async goToWorkoutDays() {
    const id = this.workoutId;
    this.logger.info('goToWorkoutDays', 'going to workout with id', JSON.stringify(id));
    this.store.dispatch(new SelectWorkout({ workoutId: id }));
    this.router.navigate([`workout-days/${id}`], { relativeTo: this.route });
  }

  get daysCount(): number {
    return (this.workoutBean.days) ? this.workoutBean.days.length : 0;
  }

  deleteWorkout() {
    this.store.dispatch(new DeleteWorkout({
      id: this.workoutId,
      days: this.workoutBean.days
    }));
  }

  exportWorkout() {
    this.store.dispatch(new ExportWorkout({
      workoutId: this.workoutId,
    }));
  }

  workoutChanged() {
    const workout = { ...this.workoutBean };
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

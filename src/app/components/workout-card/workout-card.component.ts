import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DisplayMode } from 'src/app/models/enums';
import { WorkoutBean } from 'src/app/models/Workout';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IAppState } from 'src/app/store/state/app.state';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { getWorkout } from 'src/app/store/selectors/workouts.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { DeleteWorkout, ExportWorkout, UpdateWorkout } from 'src/app/store/actions/workouts.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { SelectWorkoutDay } from 'src/app/store/actions/workoutDays.actions';
import { AlertController } from '@ionic/angular';
import { getSignedInUser } from 'src/app/store/selectors/data.selectors';
import { Subject } from 'rxjs';

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
  private signedInUser: string;
  private name: string;
  private description: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(
    loggingService: LoggingService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private clipboard: Clipboard,
    private dataService: DataServiceProvider,
    private alertController: AlertController,

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
      this.store.select(getSignedInUser)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(signedInUser => {
        this.signedInUser = signedInUser;
      });
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy', this.workout);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
    if (this.signedInUser) {
      this.store.dispatch(new ExportWorkout({
        workoutId: this.workoutId, signedInUser: this.signedInUser
      }));
    } else {
      this.presentSignInAlert();
    }
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

  editDescription(event: any) {
    event.stopPropagation();
    this.presentAlertPrompt(this.description);
  }

  async presentAlertPrompt(inputText: string) {
    const alert = await this.alertController.create({
      header: 'Edit Description',
      inputs: [{
        name: 'text',
        id: 'text',
        type: 'textarea',
        value: inputText,
        placeholder: 'Enter workout description here...'
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
            this.description = data.text;
            this.workoutChanged();
          } else {
            return false;
          }
        }
      }
      ]
    });

    alert.present();
  }
  async presentSignInAlert() {
    const alert = await this.alertController.create({
      header: 'Export Workout!',
      message: `
      You must be signed in to your account in order to export a workout.<br/>
      The sign in link is on the Options (Account) tab.<br/>
      Click Okay to go to the Account Sign In, or Cancel to close this dialog.
      `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.logger.info('Confirm canceled');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('/tabs/tab-settings');
          }
        }
      ]
    });

    await alert.present();
  }
}

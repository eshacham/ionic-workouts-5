import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DisplayMode, ExportWorkoutAction } from 'src/app/models/enums';
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
import { AlertController, PopoverController } from '@ionic/angular';
import { getSignedInUser } from 'src/app/store/selectors/data.selectors';
import { Subject } from 'rxjs';
import { ISignedInUser } from 'src/app/store/state/data.state';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ChooseExportActionPopoverComponent } from '../choose-export-action-popover/choose-export-action-popover.component';
import { FeatureManagerService } from 'src/app/providers/feature-manager/feature-manager.service';

@Component({
  selector: 'app-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
})
export class WorkoutCardComponent implements OnInit, OnDestroy {

  @Input() workoutId: string;
  @Input() displayMode: DisplayMode;
  private logger: Logger;
  private signedInUser: ISignedInUser;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  workout: WorkoutBean;
  description: string;
  name: string;


  constructor(
    loggingService: LoggingService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private clipboard: Clipboard,
    private dataService: DataServiceProvider,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
    private popoverCtrl: PopoverController,
    private featureService: FeatureManagerService,
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
  get IsWebApp() { return this.dataService.isWebApp; }
  async goToWorkoutDay(dayId: string) {
    this.logger.info('goToWorkoutDay', this.workoutId, dayId);
    this.store.dispatch(new SelectWorkoutDay({
      workoutId: this.workoutId,
      dayId
    }));
    this.router.navigate(['/tabs/tab-workouts/workout'], { relativeTo: this.route.root });
  }

  get daysCount(): number {
    return (this.workout.days) ? this.workout.days.length : 0;
  }

  deleteWorkout() {
    this.presentDeleteWorkoutConfirmAlert();
  }

  async presentDeleteWorkoutConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Delete Workout!',
      message: 'Are you sure you want to delete this workout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.logger.info('Confirm canceled');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Yes');
            this.store.dispatch(new DeleteWorkout({
              id: this.workoutId,
              days: this.workout.days
            }));
          }
        }
      ]
    });

    await alert.present();
  }

  shareWorkout(event: Event) {
    this.featureService.runFeatureIfEnabled('Export Workout',
      () => {
        if (this.signedInUser) {
          this.presentExportActionsPopover(event);
        } else {
          this.presentSignInAlert();
        }
      });
  }

  async presentExportActionsPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: ChooseExportActionPopoverComponent,
      event,
      componentProps: {
      }
    });
    popover.present();
    popover.onDidDismiss()
      .then(result => {
        this.logger.info('onDidDismiss', result.data as ExportWorkoutAction);
        switch (result.data) {
          case ExportWorkoutAction.Upload:
            this.store.dispatch(new ExportWorkout({
              workoutId: this.workoutId, signedInUser: this.signedInUser
            }));
            break;
          case ExportWorkoutAction.SMS:
            const payload = `workoutKey: ${this.workoutId}, ownerUserId: ${this.signedInUser.identityId.split(':')[1]}`;
            this.logger.info('onDidDismiss ExportWorkoutAction.SMS', payload);
            this.socialSharing.shareViaSMS(JSON.stringify(payload), '');
            break;
          default:
            break;
        }
      });
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
      The sign in link is on the Settings (Account) tab.<br/>
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

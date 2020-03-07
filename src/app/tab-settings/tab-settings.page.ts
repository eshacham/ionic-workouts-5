import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeServiceProvider, ITheme } from '../providers/theme-service/theme-service';
import { Router } from '@angular/router';
import { Logger, LoggingService } from 'ionic-logging-service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { getTheme, getSignedInUser } from '../store/selectors/data.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { SetTheme, ResetData } from '../store/actions/data.actions';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { Subject } from 'rxjs';
import { ISignedInUser } from '../store/state/data.state';

interface ISelectedTheme  {
  selected: boolean;
  theTheme: ITheme;
}
enum Segment {
  Themes = 'themes',
  Account = 'account',
  Workouts = 'workouts'
}

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage implements OnInit, OnDestroy {
  private logger: Logger;
  themes: ISelectedTheme[];
  selectedSegment: Segment = Segment.Account;
  segment = Segment;
  selectedTheme: string;
  signedInUser: ISignedInUser;
  private ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(
    loggingService: LoggingService,
    private themeService: ThemeServiceProvider,
    private store: Store<IAppState>,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController
    ) {
      this.logger = loggingService.getLogger('App.TabSettingsPage');
      this.themes = this.themeService.themes.map(t => ({ selected: false, theTheme: t }));
      this.logger.entry('ctor', this.themes);
    }

    ngOnInit() {
      this.store.select(getTheme)
      .pipe(take(1))
      .subscribe((theme) => {
        this.logger.info('ngOnInit', 'getTheme', theme);
        if (theme) {
          this.selectedTheme = theme;
          this.themes.find(t => t.theTheme.name === theme).selected = true;
        }
      });
      this.store.select(getSignedInUser)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(signedInUser => {
        this.signedInUser = signedInUser;
      });
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

   themeSelected(selectedTheme: string) {
    this.selectedTheme = selectedTheme;
    this.themes.forEach(t => t.selected = t.theTheme.name === this.selectedTheme);
    this.logger.debug('theme selected: ', this.selectedTheme);
    this.store.dispatch(new SetTheme(this.selectedTheme));
  }

  getSelectedThemeImage(i: number): string {
    const theme = this.themes.find(t => t.selected);
    if (theme) {
      return `${theme.theTheme.image}-${i}.png`;
    }
  }

  segmentChanged(segment: Segment) {
    this.selectedSegment = segment;
    this.logger.debug('segmentChanged', this.selectedSegment);
  }

  async resetData() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Reset workouts data will delete any new or customized workout, including its images.',
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
            this.store.dispatch(new ResetData());
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.logger.info('presentLoginModal', 'onWillDismiss', data);
  }

}

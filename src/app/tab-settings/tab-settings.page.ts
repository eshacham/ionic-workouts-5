import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeServiceProvider, Themes } from '../providers/theme-service/theme-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger, LoggingService } from 'ionic-logging-service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { getTheme, getSignedInUser, getReleaseNotesAndTermsOfUse } from '../store/selectors/data.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { SetTheme, ResetData, TermsAccpeted, TermsNotAccpeted } from '../store/actions/data.actions';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ReleaseNotesComponent } from '../components/release-notes/release-notes.component'
import { Subject } from 'rxjs';
import { ISignedInUser } from '../store/state/data.state';
import { Version } from '../models/Version';
import { FeatureManagerService } from '../providers/feature-manager/feature-manager.service';
import { TermsOfUseComponent } from '../components/terms-of-use/terms-of-use.component';
import { TermsOfUse } from '../models/TermsOfUse';

interface ISelectedTheme  {
  selected: boolean;
  theTheme: Themes;
}
enum Segment {
  Themes = 'themes',
  Account = 'account',
  Options = 'options',
}

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss']
})
export class TabSettingsPage implements OnInit, OnDestroy {
  private logger: Logger;
  themes: ISelectedTheme[];
  selectedSegment: Segment = Segment.Options;
  segment = Segment;
  selectedTheme: string;
  signedInUser: ISignedInUser;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  releaseNotes: Version[];
  termsOfUse: TermsOfUse;
  appVersion: string;

  constructor(
    loggingService: LoggingService,
    private route: ActivatedRoute,
    private themeService: ThemeServiceProvider,
    private store: Store<IAppState>,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private featureService: FeatureManagerService,

    ) {
      this.logger = loggingService.getLogger('App.TabSettingsPage');
      this.themes = this.themeService.themes.map(t => ({ selected: false, theTheme: t }));
      this.logger.entry('ctor', this.themes);
    }

    async ngOnInit() {
      this.store.select(getTheme)
      .pipe(take(1))
      .subscribe((theme) => {
        this.logger.info('ngOnInit', 'getTheme', theme);
        if (theme) {
          this.selectedTheme = theme;
          this.themes.find(t => t.theTheme === theme).selected = true;
        }
      });
      this.store.select(getSignedInUser)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(signedInUser => {
        this.signedInUser = signedInUser;
      });
      this.store.select(getReleaseNotesAndTermsOfUse)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.releaseNotes = data.releaseNotes;
        this.termsOfUse = data.termsOfUse;
      });
      this.appVersion = (await this.featureService.getAppVersion()).number;
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }

   themeSelected(selectedTheme: string) {
    this.selectedTheme = selectedTheme;
    this.themes.forEach(t => t.selected = t.theTheme === this.selectedTheme);
    this.logger.debug('theme selected: ', this.selectedTheme);
    this.store.dispatch(new SetTheme(this.selectedTheme));
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

  gotoUserGuide() {
    this.router.navigate(['/tabs/tab-settings/user-guide'], { relativeTo: this.route.root });

  }
  async presentReleaseNotesModal() {
    const modal = await this.modalController.create({
      component: ReleaseNotesComponent,
      componentProps: {
        releaseNotes: this.releaseNotes,
        appVersion: this.appVersion,
      },
      swipeToClose: true,
      cssClass: 'auto-height',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.logger.info('presentReleaseNotesModal', 'onWillDismiss', data);
  }
  async presentTermsOfUseModal() {
    const modal = await this.modalController.create({
      component: TermsOfUseComponent,
      componentProps: {
        termsOfUse: {...this.termsOfUse  },
      },
      swipeToClose: false,
      backdropDismiss: false,
      keyboardClose: false,
      cssClass: 'auto-height',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.logger.info('presentTermsOfUseModal', 'onWillDismiss', data);
    if (data) {
      const { termsOfUse} = data;
      if (this.termsOfUse.isAccepted !== termsOfUse.isAccepted) {
        this.store.dispatch(termsOfUse.isAccepted
          ? new TermsAccpeted(termsOfUse)
          : new TermsNotAccpeted(termsOfUse));
      }
    }
  }

}

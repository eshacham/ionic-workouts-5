import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeServiceProvider } from '../providers/theme-service/theme-service';
import {
  getError,
  getWorkoutExportInProgress,
  getWorkoutImportInProgress,
  getTheme
} from '../store/selectors/data.selectors';
import { takeUntil } from 'rxjs/operators';
import { LoadData } from '../store/actions/data.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { ToastService } from '../providers/toast-service/toast-service';
import { Subject } from 'rxjs';
import { Logger, LoggingService } from 'ionic-logging-service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  private logger: Logger;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private exportHasStarted = false;
  private importHasStarted = false;
  private loading: HTMLIonLoadingElement;

  constructor(
    loggingService: LoggingService,
    private themeService: ThemeServiceProvider,
    private store: Store<IAppState>,
    private toastService: ToastService,
    private loadingController: LoadingController
  ) {
    this.logger = loggingService.getLogger('App.TabsPage');
  }

  ngOnInit() {
    this.store.dispatch(new LoadData());

    this.store.select(getTheme)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((theme) => {
        if (theme) {
          this.themeService.setTheme(theme);
        }
      });

    this.store.select(getError)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((error) => {
        if (error) {
          this.logger.debug('ngOnInit', 'etError:', error);
          this.toastService.presentToast(error, 'danger');
        }
      });

    this.store.select(getWorkoutExportInProgress)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((exportInProgress) => {
        this.logger.debug('ngOnInit', 'getWorkoutExportInProgress', exportInProgress);
        if (this.exportHasStarted && !exportInProgress) {
          this.loadingController.dismiss();
          this.toastService.presentToast('Export workout has completed!');
        }
        this.exportHasStarted = exportInProgress;
        if (this.exportHasStarted) { this.presentBusy('Exporting Workout...'); }
      });

    this.store.select(getWorkoutImportInProgress)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((importInProgress) => {
        this.logger.debug('ngOnInit', 'getWorkoutImportInProgress', importInProgress);
        if (this.importHasStarted && !importInProgress) {
          this.loadingController.dismiss();
          this.toastService.presentToast('Import workout has completed!');
        }
        this.importHasStarted = importInProgress;
        if (this.importHasStarted) { this.presentBusy('Importing Workout...'); }
      });
  }

  private async presentBusy(message: string): Promise<void> {
    this.loading = await this.loadingController.create({
      message,
      spinner: 'lines'
    });
    this.loading.present();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

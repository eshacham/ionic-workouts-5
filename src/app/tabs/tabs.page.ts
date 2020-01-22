import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeServiceProvider } from '../providers/theme-service/theme-service';
import { getHasDataBeenLoaded, getError, getWorkoutExportInProgress, getWorkoutImportInProgress } from '../store/selectors/data.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { GetData } from '../store/actions/data.actions';
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
    themeService: ThemeServiceProvider,
    private store: Store<IAppState>,
    private toastService: ToastService,
    private loadingController: LoadingController
  ) {
    this.logger = loggingService.getLogger('App.TabsPage');

    themeService.addBodyClass('gray-orange-black');
    // themeService.addBodyClass('original');
  }

  ngOnInit() {
    this.store.select(getHasDataBeenLoaded)
      .pipe(take(1))
      .subscribe(loaded => {
        if (!loaded) {
          this.store.dispatch(new GetData());
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

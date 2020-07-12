import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LoggingService, Logger } from 'ionic-logging-service';
import { IAppState } from './store/state/app.state';
import { Store } from '@ngrx/store';
import { LoadTheme } from './store/actions/data.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private logger: Logger;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    loggingService: LoggingService,
    private store: Store<IAppState>,
  ) {
    this.logger = loggingService.getLogger('App');
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.store.dispatch(new LoadTheme());
      this.splashScreen.hide();
      if (this.platform.is('ios')) {
        this.backgroundMode.enable();
        // this.backgroundMode.disableWebViewOptimizations();
        // this.backgroundMode.overrideBackButton();
        // this.backgroundMode.on('activate').subscribe(()=> {
        //     this.logger.info('backgroundMode', 'activate')
        // });
      }
    });
  }
}

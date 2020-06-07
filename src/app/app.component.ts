import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { LoggingService, Logger } from 'ionic-logging-service';
import { IAppState } from './store/state/app.state';
import { Store } from '@ngrx/store';
import { LoadTheme } from './store/actions/data.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // private logger: Logger;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // loggingService: LoggingService,
    private store: Store<IAppState>,
  ) {
    this.initializeApp();
    // this.logger = loggingService.getLogger('App');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.store.dispatch(new LoadTheme());
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

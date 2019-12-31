import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { HttpClientModule } from '@angular/common/http';

import {
  AmplifyAngularModule,
  AmplifyService,
  AmplifyModules
} from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './store/effects/data.effects';
import { appReducers, metaReducers, storeDevtoolsModule } from './store/reducers/appReducers';

import { ThemeServiceProvider } from './providers/theme-service/theme-service';
import { DataServiceProvider } from './providers/data-service/data-service';

import { LoggingService, LoggingServiceModule } from 'ionic-logging-service';
import { environment } from 'src/environments/environment';

export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(appReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    storeDevtoolsModule,
    EffectsModule.forRoot([DataEffects]),
    HttpClientModule,
    AmplifyAngularModule,
    LoggingServiceModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: AmplifyService, useFactory: () => {
        return AmplifyModules({
          Auth,
          Storage
        });
      }
    },
    File,
    WebView,
    Clipboard,
    ThemeServiceProvider,
    DataServiceProvider,
    {
      deps: [LoggingService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: configureLogging
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

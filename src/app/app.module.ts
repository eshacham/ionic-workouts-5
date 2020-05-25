import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/File/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { LoggingService, LoggingServiceModule } from 'ionic-logging-service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataEffects } from './store/effects/data.effects';
import { appReducers, metaReducers, storeDevtoolsModule } from './store/reducers/appReducers';

import { ThemeServiceProvider } from './providers/theme-service/theme-service';
import { FeatureManagerService } from './providers/feature-manager/feature-manager.service';
import { DataServiceProvider } from './providers/data-service/data-service';
import { AudioServiceProvider } from './providers/audio-service/audio-service';
import { SocialSharing }  from '@ionic-native/social-sharing/ngx';

import { environment } from 'src/environments/environment';

export function configureLogging(loggingService: LoggingService): () => void {
  return () => loggingService.configure(environment.logging);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
  ],
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
    LoggingServiceModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AmplifyService,
    {
      deps: [LoggingService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: configureLogging
    },
    File,
    AppVersion,
    WebView,
    Clipboard,
    FeatureManagerService,
    ThemeServiceProvider,
    DataServiceProvider,
    AudioServiceProvider,
    SocialSharing,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

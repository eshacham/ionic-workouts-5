import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const awsconfig = require('./aws-exports').default;
// import * as awsconfig from './aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig);

import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  // console.log('main-Amplify.configure(awsconfig)', awsconfig)
import { Injectable } from '@angular/core';
import { Version } from 'src/app/models/Version';
import { DataServiceProvider } from '../data-service/data-service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { getReleaseNotes } from 'src/app/store/selectors/data.selectors';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureManagerService {

  constructor(
    private dataService: DataServiceProvider,
    private appVersion: AppVersion,
    private store: Store<IAppState>,

  ) {
  }

  async getAppVersion() {
    const version = this.dataService.isMobile ? {
      number: await this.appVersion.getVersionNumber(),
      code: await this.appVersion.getVersionCode(),
      package: await this.appVersion.getPackageName(),
      name: await this.appVersion.getAppName(),
    } :
    {
      number: environment.version,
    };
    return version;
  }

  runFeatureIfEnabled(
    featureName: string,
    featureInvokation: () => void) {
      this.store.select(getReleaseNotes)
      .pipe(take(1))
      .subscribe(async (versions) => {
        if (!versions || !versions.length) {
          return
        }
        const currentVersionId = (await this.getAppVersion()).number;
        const version = versions.find(v=>v.id === currentVersionId);
        if (!version) {
          return;
        }
        const feature  = version.features.find(f=>f.name === featureName);
        if (!feature || !feature.on) {
          return;
        }
        featureInvokation();
      });
  }
}

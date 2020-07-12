import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { IAppState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment';
import { DataServiceProvider } from '../data-service/data-service';
import { getReleaseNotesAndTermsOfUse } from 'src/app/store/selectors/data.selectors';
import { ToastService } from 'src/app/providers/toast-service/toast-service';
import { LoadReleaseNotesAndTermsOfUse } from 'src/app/store/actions/data.actions';

@Injectable({
  providedIn: 'root'
})
export class FeatureManagerService {

  constructor(
    private dataService: DataServiceProvider,
    private appVersion: AppVersion,
    private store: Store<IAppState>,
    private toastService: ToastService,

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
      this.store.dispatch(new LoadReleaseNotesAndTermsOfUse());
      this.store.select(getReleaseNotesAndTermsOfUse)
      .pipe(take(1))
      .subscribe(async (data) => {
        if (!data || !data.releaseNotes || !data.releaseNotes.length) {
          this.toastService.presentToast('Releae Notes not found. Aborting!')
          return;
        }
        if (!data.termsOfUse || !data.termsOfUse.isAccepted) {
          this.toastService.presentToast('Terms of Use not accepted. Aborting!')
          return;
        }
        const currentVersionId = (await this.getAppVersion()).number;
        const version = data.releaseNotes.find(v=>v.id === currentVersionId);
        if (!version) {
          this.toastService.presentToast(`App version ${currentVersionId} not supported. Aborting!`)
          return;
        }
        const feature  = version.features.find(f=>f.name === featureName);
        if (feature && !feature.on) {
          this.toastService.presentToast(`Feature ${featureName} is disabled. Aborting!`)
          return;
        }
        featureInvokation();
      });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Version } from 'src/app/models/Version';
import { Feature } from 'src/app/models/Feature';
import { LoadReleaseNotesAndTermsOfUse } from 'src/app/store/actions/data.actions';
import { IAppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';

interface IExpandableFeature extends Feature {
  isExpanded: boolean;
}
interface IExpandableVersion {
  id: string;
  name: string;
  features: IExpandableFeature[];
}

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
})
export class ReleaseNotesComponent implements OnInit {
  @Input() releaseNotes: Record<string, Version>;
  expandableReleaseNotes: IExpandableVersion[];
  @Input() appVersion: string;
  constructor(
    private modalCtrl: ModalController,
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.expandableReleaseNotes = Object.values(this.releaseNotes).map((item: Version) => ({
        ...item,
        features: item.features.map((f: Feature) => ({...f, isExpanded: false }))
      }));
  }
  isCurrentVersion(version: Version): boolean {
    return this.appVersion === version.id;
  }
  getVersionTitle(version: Version): string {
    return `${version.name} (${version.id})`;
  }
  getFeatureTitle(feature: Feature): string {
    const enabled = this.isFeatureEnabled(feature);
    return `${feature.name} (${enabled ? 'enabled' : 'disabled'})`;
  }

  isFeatureEnabled(feature): boolean {
    let enabled = false;
    if (feature.on === undefined || feature.on) {
      enabled = true;
    }
    return enabled;
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({

    });
  }
  // refresh() {
  //   this.store.dispatch(new LoadReleaseNotesAndTermsOfUse());
  // }
}

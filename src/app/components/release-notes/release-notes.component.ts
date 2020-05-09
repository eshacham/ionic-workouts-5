import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Version } from 'src/app/models/Version';
import { Feature } from 'src/app/models/Feature';


@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
})
export class ReleaseNotesComponent implements OnInit {
  @Input() releaseNotes: Version[];
  @Input() appVersion: string;
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}
  isCurrentVersion(version): boolean {
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
}

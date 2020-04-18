import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TermsOfUse } from 'src/app/models/TermsOfUse';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit {
  @Input() termsOfUse: TermsOfUse;
  constructor(private modalCtrl: ModalController,
    ) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      termsOfUse: this.termsOfUse,
    });
  }
}

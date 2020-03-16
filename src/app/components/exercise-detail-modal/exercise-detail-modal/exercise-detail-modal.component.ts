import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-exercise-detail-modal',
  templateUrl: './exercise-detail-modal.component.html',
  styleUrls: ['./exercise-detail-modal.component.scss'],
})
export class ExerciseDetailModalComponent implements OnInit {
  media: ExerciseMediaBean;
  private selectedIndex: number;
  get selectedImageUrl(): SafeUrl {
    return this.dataService.safeImage(this.media, this.selectedIndex);
  }
  get selectedImageName(): string {
    return `${this.media.name} (${this.selectedIndex + 1})`;
  }
  constructor(
    navParams: NavParams,
    private dataService: DataServiceProvider,
    private modalController: ModalController
    ) {
    this.media = navParams.get('media')
    this.selectedIndex = navParams.get('selectedIndex');
  }

  ngOnInit() {}
  closeModal() { this.modalController.dismiss(); }

}

import { Component, OnInit } from '@angular/core';
import { MediaAction } from 'src/app/models/enums';
import { PopoverController, NavParams } from '@ionic/angular';
import { ExerciseMediaWithUsage } from '../../tab-library/tab-library.page'

@Component({
  selector: 'app-choose-media-action-popover',
  templateUrl: './choose-media-action-popover.component.html',
  styleUrls: ['./choose-media-action-popover.component.scss'],
})
export class ChooseMediaActionPopoverComponent implements OnInit {
  isExpanded: boolean;
  isDefaultImage: boolean;
  selectedIndex: number;
  imagesLength: number;
  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams,

  ) {
    const media = this.navParams.data.media as ExerciseMediaWithUsage;
    this.isExpanded = media.expanded;
    this.imagesLength = media.media.images.length;
    this.isDefaultImage = media.media.isDefault;
    this.selectedIndex = this.navParams.data.selectedIndex;
  }

  ngOnInit() { }

  close(action: MediaAction) {
    this.popoverController.dismiss(action);
  }
  showUsage() {
    this.close(MediaAction.ShowUsage);
  }
  viewLarge() {
    this.close(MediaAction.ViewLarge);
  }

  insertImage() {
    this.close(MediaAction.InsertImage);
  }
  removeImage() {
    this.close(MediaAction.DeleteImage);
  }
  moveAhead() {
    this.close(MediaAction.MoveAhead);
  }

}

import { Component, OnInit } from '@angular/core';
import { MediaAction } from 'src/app/models/enums';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-choose-media-action-popover',
  templateUrl: './choose-media-action-popover.component.html',
  styleUrls: ['./choose-media-action-popover.component.scss'],
})
export class ChooseMediaActionPopoverComponent implements OnInit {
  isExpanded: boolean;
  selectedIndex: number;
  imagesLength: number;
  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams,

  ) {
    this.isExpanded = this.navParams.data.media.isExpanded;
    this.selectedIndex = this.navParams.data.media.selectedIndex;
    this.imagesLength = this.navParams.data.media.media.images.length
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
  viewNext() {
    this.close(MediaAction.ViewNext);
  }
  viewPrev() {
    this.close(MediaAction.ViewPrev);
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

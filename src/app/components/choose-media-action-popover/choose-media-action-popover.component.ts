import { Component, OnInit } from '@angular/core';
import { MediaAction } from 'src/app/models/enums';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-choose-media-action-popover',
  templateUrl: './choose-media-action-popover.component.html',
  styleUrls: ['./choose-media-action-popover.component.scss'],
})
export class ChooseMediaActionPopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController,
    ) { }

  ngOnInit() {}

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

}

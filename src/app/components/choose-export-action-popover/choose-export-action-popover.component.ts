import { Component, OnInit } from '@angular/core';
import { ExportWorkoutAction } from 'src/app/models/enums';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-choose-export-action-popover',
  templateUrl: './choose-export-action-popover.component.html',
  styleUrls: ['./choose-export-action-popover.component.scss'],
})
export class ChooseExportActionPopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController,
    ) { }

  ngOnInit() {}

  close(action: ExportWorkoutAction) {
    this.popoverController.dismiss(action);
  }
  sendWorkoutBySms() {
    this.close(ExportWorkoutAction.SMS);
  }
  uploadWorkout() {
    this.close(ExportWorkoutAction.Upload);
  }

}

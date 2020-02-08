import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ExerciseAction } from 'src/app/models/enums';

@Component({
  selector: 'app-choose-exercise-action-popover',
  templateUrl: './choose-exercise-action-popover.component.html',
  styleUrls: ['./choose-exercise-action-popover.component.scss'],
})
export class ChooseExerciseActionPopoverComponent implements OnInit {
  canSwap: boolean;
  isExpanded: boolean;
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    ) { }

  ngOnInit() {
    this.canSwap = this.navParams.data.canSwap;
    this.isExpanded = this.navParams.data.isExpanded;
  }

  close(action: ExerciseAction) {
    this.popoverController.dismiss(action);
  }

  editExercise() {
    this.close(ExerciseAction.EditSet);
  }
  deleteExercise() {
    this.close(ExerciseAction.Delete);
  }
  swapExercise() {
    this.close(ExerciseAction.SwitchSet);
  }
  viewExercise() {
    this.close(ExerciseAction.GotoExercise);
  }

}

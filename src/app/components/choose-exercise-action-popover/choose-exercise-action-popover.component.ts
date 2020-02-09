import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ExerciseAction } from 'src/app/models/enums';
import { Rep } from 'src/app/models/Rep';

@Component({
  selector: 'app-choose-exercise-action-popover',
  templateUrl: './choose-exercise-action-popover.component.html',
  styleUrls: ['./choose-exercise-action-popover.component.scss'],
})
export class ChooseExerciseActionPopoverComponent implements OnInit {
  canSwap: boolean;
  isExpanded: boolean;
  isSetActions: boolean;
  rep: Rep;
  isMinReps: boolean;
  isMaxReps: boolean;
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    ) { }

  ngOnInit() {
    this.canSwap = this.navParams.data.canSwap;
    this.isExpanded = this.navParams.data.isExpanded;
    this.isSetActions = this.navParams.data.isSetActions;
    this.rep = this.navParams.data.rep;
    this.isMinReps = this.navParams.data.isMinReps;
    this.isMaxReps = this.navParams.data.isMaxReps;
  }

  close(action: ExerciseAction) {
    this.popoverController.dismiss(action);
  }

  editSet() {
    this.close(ExerciseAction.EditSet);
  }
  editVariation() {
    this.close(ExerciseAction.EditVariation);
  }
  deleteExercise() {
    this.close(ExerciseAction.DeleteExercise);
  }
  deleteSet() {
    this.close(ExerciseAction.DeleteSet);
  }
  addSet() {
    this.close(ExerciseAction.AddSet);
  }
  configureSet() {
      this.close(ExerciseAction.ConfigureSet);
  }
  swapExercise() {
    this.close(ExerciseAction.SwapSets);
  }
  viewExercise() {
    this.close(ExerciseAction.GotoExercise);
  }

}

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
  actions: ExerciseAction[];
  exerciseAction = ExerciseAction;
  canSwap: boolean;
  isViewSetExpanded: boolean;
  rep: Rep;
  isMinReps: boolean;
  isMaxReps: boolean;
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    ) { }

  ngOnInit() {
    this.canSwap = this.navParams.data.canSwap;
    this.isViewSetExpanded = this.navParams.data.isViewSetExpanded;
    this.rep = this.navParams.data.rep;
    this.isMinReps = this.navParams.data.isMinReps;
    this.isMaxReps = this.navParams.data.isMaxReps;
    this.actions = this.navParams.data.actions;
  }

  isActionAvailable(action: ExerciseAction): boolean {
    return this.actions.includes(action);
  }

  close(action: ExerciseAction) {
    this.popoverController.dismiss(action);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ExerciseAction } from 'src/app/models/enums';
import { Set } from 'src/app/models/Set';

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
  multiSet: boolean;
  set: Set;
  isMinSets: boolean;
  isMaxSets: boolean;
  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController,
    ) { }

  ngOnInit() {
    this.canSwap = this.navParams.data.canSwap;
    this.isViewSetExpanded = this.navParams.data.isViewSetExpanded;
    this.set = this.navParams.data.set;
    this.isMinSets = this.navParams.data.isMinSets;
    this.isMaxSets = this.navParams.data.isMaxSets;
    this.actions = this.navParams.data.actions;
    this.multiSet = this.navParams.data.multiSet
  }

  isActionAvailable(action: ExerciseAction): boolean {
    return this.actions.includes(action);
  }

  close(action: ExerciseAction) {
    this.popoverController.dismiss(action);
  }

  get ShowHideSetLabel(): string {
    return `${this.isViewSetExpanded ? 'Hide' : 'Show'} ${this.multiSet ? 'multi-set' : 'set'}`;
  }

}

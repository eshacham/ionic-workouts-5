import { Component, Input } from '@angular/core';
import { ExerciseBean } from 'src/app/models/Exercise';
import { PopoverController } from '@ionic/angular';
import { WeightType, GripType, GripWidth, RepetitionSpeed } from 'src/app/models/enums';
import { ExerciseVariationPopoverComponent } from '../exercise-variation-popover/exercise-variation-popover.component';

@Component({
  selector: 'app-exercise-variation',
  templateUrl: './exercise-variation.component.html',
  styleUrls: ['./exercise-variation.component.scss'],
})
export class ExerciseVariationComponent {

  @Input() exercise: ExerciseBean;
  @Input() inEditMode: boolean;

  get InEditMode(): boolean {
      return this.inEditMode;
  }

  constructor(private popoverCtrl: PopoverController) {
  }

  getWeightVariation = (): string => {
    if (this.exercise.typeOfWeight !== WeightType.NoWeight) {
      return `${this.exercise.typeOfWeight}`;
    }
  }
  getSpeedVariation = (): string => {
    if (this.exercise.repSpeed !== RepetitionSpeed.NA) {
      return `${this.exercise.repSpeed}`;
    }
  }
  getGripVariation = (): string => {
    let rc = '';
    let hasWidth = false;
    if (this.exercise.theGrip.width !== GripWidth.NoGrip) {
      rc = `Grip: ${this.exercise.theGrip.width}`;
      hasWidth = true;
    }
    if (this.exercise.theGrip.typeOfGrip !== GripType.NoGrip) {
      if (!hasWidth) {
        rc += `Grip: ${this.exercise.theGrip.typeOfGrip}`;
      } else {
        rc += `, ${this.exercise.theGrip.typeOfGrip}`;
      }
    }

    return rc;
  }

  get exerciseDetails(): string {
    const details = [];
    let rc: string;

    rc = this.getWeightVariation();
    if (rc) { details.push(rc); }
    rc = this.getGripVariation();
    if (rc) { details.push(rc); }
    rc = this.getSpeedVariation();
    if (rc) { details.push(rc); }

    return details.length ? details.join(' | ') : '...';
  }

}

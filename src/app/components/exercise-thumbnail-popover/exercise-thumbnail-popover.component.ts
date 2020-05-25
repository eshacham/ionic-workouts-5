import { Component, OnInit } from '@angular/core';
import { Set } from 'src/app/models/Set';
import { NavParams } from '@ionic/angular';
import { WeightUnit } from 'src/app/models/enums';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { UpdateSet } from 'src/app/store/actions/exercises.actions';

@Component({
  selector: 'app-exercise-thumbnail-popover',
  templateUrl: './exercise-thumbnail-popover.component.html',
  styleUrls: ['./exercise-thumbnail-popover.component.scss'],
})
export class ExerciseThumbnailPopoverComponent implements OnInit {
  set: Set;
  exeId: string;
  setIndex: number;
  weightUnits: string[];

  constructor(
    private navParams: NavParams,
    private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.set = Set.copySet(this.navParams.data.set);
    this.exeId = this.navParams.data.exeId;
    this.setIndex = this.navParams.data.setIndex;
    this.weightUnits = Object.keys(WeightUnit).map(key => WeightUnit[key]);
  }

  UpdateSet() {
    this.store.dispatch(new UpdateSet({
      exerciseId: this.exeId,
      set: Set.copySet(this.set),
      setIndex: this.setIndex
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { Rep } from 'src/app/models/Rep';
import { NavParams } from '@ionic/angular';
import { WeightUnit } from 'src/app/models/enums';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { UpdateRep } from 'src/app/store/actions/exercises.actions';

@Component({
  selector: 'app-exercise-thumbnail-popover',
  templateUrl: './exercise-thumbnail-popover.component.html',
  styleUrls: ['./exercise-thumbnail-popover.component.scss'],
})
export class ExerciseThumbnailPopoverComponent implements OnInit {
  rep: Rep;
  exeId: string;
  repIndex: number;
  weightUnits: string[];

  constructor(
    private navParams: NavParams,
    private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.rep = Rep.copyRep(this.navParams.data.rep);
    this.exeId = this.navParams.data.exeId;
    this.repIndex = this.navParams.data.repIndex;
    this.weightUnits = Object.keys(WeightUnit).map(key => WeightUnit[key]);
  }

  UpdateRep() {
    this.store.dispatch(new UpdateRep({
      exerciseId: this.exeId,
      rep: Rep.copyRep(this.rep),
      repIndex: this.repIndex
    }));
  }

}

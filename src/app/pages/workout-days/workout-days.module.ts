import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WorkoutDaysPage } from './workout-days.page';
import { WorkoutDayComponent } from '../../components/workout-day/workout-day.component';
import { ExerciseThumbnailComponent } from '../../components/exercise-thumbnail/exercise-thumbnail.component';
import { ExerciseThumbnailPopoverComponent } from '../../components/exercise-thumbnail-popover/exercise-thumbnail-popover.component';
// tslint:disable-next-line: import-spacing
import { ChooseExerciseActionPopoverComponent }
  from '../../components/choose-exercise-action-popover/choose-exercise-action-popover.component';
import { ExerciseVariationComponent } from 'src/app/components/exercise-variation/exercise-variation.component';
import { ExerciseVariationPopoverComponent } from '../../components/exercise-variation-popover/exercise-variation-popover.component';
import { SelectExercisePageModule } from '../../pages/select-exercise/select-exercise.module';
import { ExpandableComponentModule } from '../../components/expandable/expandable.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkoutDaysPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ExpandableComponentModule,
    SelectExercisePageModule,
  ],
  declarations: [
    WorkoutDaysPage,
    WorkoutDayComponent,
    ExerciseThumbnailComponent,
    ExerciseThumbnailPopoverComponent,
    ChooseExerciseActionPopoverComponent,
    ExerciseVariationComponent,
    ExerciseVariationPopoverComponent
  ],
  entryComponents: [
    ExerciseThumbnailPopoverComponent,
    ExerciseVariationPopoverComponent,
    ChooseExerciseActionPopoverComponent,
  ]
})
export class WorkoutDaysPageModule { }

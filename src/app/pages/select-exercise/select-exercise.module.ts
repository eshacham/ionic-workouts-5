import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectExercisePage } from './select-exercise.page';

const routes: Routes = [
  {
    path: 'select-exercise',
    pathMatch: 'full',
    component: SelectExercisePage
  },
  {
    path: 'select-exercise/select-muscle',
    loadChildren: () => import('../select-muscle/select-muscle.module').then(m => m.SelectMusclePageModule)
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectExercisePage]
})
export class SelectExercisePageModule {}

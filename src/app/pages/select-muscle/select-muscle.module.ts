import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SelectMusclePage } from './select-muscle.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SelectMusclePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SelectMusclePage]
})
export class SelectMusclePageModule {}

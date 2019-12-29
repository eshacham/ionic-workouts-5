import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutDaysPage } from './workout-days.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutDaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutDaysPageRoutingModule {}

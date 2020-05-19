import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabWorkoutsPage } from './tab-workouts.page';
import { WorkoutCardComponent } from '../components/workout-card/workout-card.component';
import { ChooseExportActionPopoverComponent } from '../components/choose-export-action-popover/choose-export-action-popover.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TabWorkoutsPage
  },
  {
    path: 'workout',
    loadChildren: () => import('../pages/workout-days/workout-days.module').then(m => m.WorkoutDaysPageModule)
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    TabWorkoutsPage,
    WorkoutCardComponent,
    ChooseExportActionPopoverComponent,
  ],
  entryComponents: [
    ChooseExportActionPopoverComponent,
  ],
  providers: [
  ]
})
export class TabWorkoutsPageModule {}

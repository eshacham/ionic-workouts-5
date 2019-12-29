import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutDaysPageRoutingModule } from './workout-days-routing.module';

import { WorkoutDaysPage } from './workout-days.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutDaysPageRoutingModule
  ],
  declarations: [WorkoutDaysPage]
})
export class WorkoutDaysPageModule {}

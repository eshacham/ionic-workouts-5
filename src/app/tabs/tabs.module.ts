import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';

import { PinchZoomModule } from 'ngx-pinch-zoom';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { ExerciseDetailModalComponent } from '../components/exercise-detail-modal/exercise-detail-modal/exercise-detail-modal.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    PinchZoomModule,
  ],
  declarations: [
    TabsPage,
    ExerciseDetailModalComponent,
  ],
  entryComponents: [
    ExerciseDetailModalComponent,
  ],
})
export class TabsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpandableComponent } from './expandable.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ExpandableComponent],
  exports: [ExpandableComponent]
})
export class ExpandableComponentModule {}

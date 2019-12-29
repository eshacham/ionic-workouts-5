import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabLibraryPage } from './tab-library.page';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TabLibraryPage
  },
  {
    path: 'select-muscle',
    loadChildren: () => import('../pages/select-muscle/select-muscle.module').then(m => m.SelectMusclePageModule)
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabLibraryPage],
  providers: [
    Camera,
    FilePath
  ]
})
export class TabLibraryPageModule { }

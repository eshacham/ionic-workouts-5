import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSettingsPage } from './tab-settings.page';
import { LoginComponent } from '../components/login/login.component'
import { ReleaseNotesComponent } from '../components/release-notes/release-notes.component'
import { TermsOfUseComponent } from '../components/terms-of-use/terms-of-use.component'
import {
  AmplifyAngularModule,
  AmplifyIonicModule,
} from 'aws-amplify-angular';

const routes: Routes = [
  {
    path: '', component: TabSettingsPage
  },
  {
    path: 'user-guide',
    loadChildren: () => import('../pages/user-guide/user-guide.module').then(m => m.UserGuidePageModule)
  }
]

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    TabSettingsPage,
    LoginComponent,
    ReleaseNotesComponent,
    TermsOfUseComponent,
  ],
  entryComponents: [
    LoginComponent,
    ReleaseNotesComponent,
    TermsOfUseComponent,
  ]
})
export class TabSettingsPageModule {}

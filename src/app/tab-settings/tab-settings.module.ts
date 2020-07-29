import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSettingsPage } from './tab-settings.page';
import { AuthComponent } from '../components/auth/auth.component'
import { ReleaseNotesComponent } from '../components/release-notes/release-notes.component'
import { TermsOfUseComponent } from '../components/terms-of-use/terms-of-use.component'

const routes: Routes = [
  {
    path: '', component: TabSettingsPage
  },
  {
    path: 'user-guide',
    loadChildren: () => import('../pages/user-guide/user-guide.module').then(m => m.UserGuidePageModule)
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
    TabSettingsPage,
    AuthComponent,
    ReleaseNotesComponent,
    TermsOfUseComponent,
  ],
  entryComponents: [
    AuthComponent,
    ReleaseNotesComponent,
    TermsOfUseComponent,
  ]
})
export class TabSettingsPageModule {}

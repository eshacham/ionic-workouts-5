import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-workouts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-workouts/tab-workouts.module').then(m => m.TabWorkoutsPageModule)
          }
        ]
      },
      {
        path: 'tab-settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-settings/tab-settings.module').then(m => m.TabSettingsPageModule)
          }
        ]
      },
      {
        path: 'tab-library',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab-library/tab-library.module').then(m => m.TabLibraryPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tab-workouts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

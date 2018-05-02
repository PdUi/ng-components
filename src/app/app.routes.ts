import { Routes } from '@angular/router';

import { WindowComponent } from './window.component';

import {
  GridComponent
} from './examples';

export const routes: Routes = [
  {
    path: 'grid',
    component: GridComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: WindowComponent,
    pathMatch: 'full'
  }
];

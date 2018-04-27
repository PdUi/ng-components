import { Routes } from '@angular/router';

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
    redirectTo: 'grid',
    pathMatch: 'full'
  }
];

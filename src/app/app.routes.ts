import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    loadChildren: () => import('./views/users/user.routes').then((r) => r.routes),
  },
];

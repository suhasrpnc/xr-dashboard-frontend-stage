import { Routes } from '@angular/router';

export default [
  {
    path: 'modulecomponent', data: { breadcrumb: 'Modules List' },loadComponent: () => import('./modulecomponent').then((c) => c.ModuleComponent),
  },
  { path: '**', redirectTo: '/notfound',
  },
] as Routes;
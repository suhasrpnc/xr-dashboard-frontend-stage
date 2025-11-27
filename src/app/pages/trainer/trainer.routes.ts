import { Routes } from '@angular/router';

export default [
    { path: 'trainertable', data: { breadcrumb: 'Trainer List' }, loadComponent: () => import('./trainer-table').then((c) => c.TrainerTable) },
    { path: 'trainer-new', data: { breadcrumb: 'Trainer New' }, loadComponent: () => import('./trainer-new').then((c) => c.NewTrainer) },
    { path: 'trainer-edit', data: { breadcrumb: 'Edit Trainer' }, loadComponent: () => import('./trainer-edit').then((c) => c.EditTrainer) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

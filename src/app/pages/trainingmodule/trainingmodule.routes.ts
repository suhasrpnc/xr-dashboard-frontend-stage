import { Routes } from '@angular/router';

export default [
    { path: '', data: { breadcrumb: 'Training Content List' }, loadComponent: () => import('./trainingmodule').then((c) => c.TrainingModule) },
    { path: 'webgl', data: { breadcrumb: 'Interactive Content' }, loadComponent: () => import('./webgl').then((c) => c.webgl) },
    { path: 'video', data: { breadcrumb: 'Video Content' }, loadComponent: () => import('./video').then((c) => c.video) },
    { path: 'pdf', data: { breadcrumb: 'Document Content' }, loadComponent: () => import('./pdf').then((c) => c.pdf) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

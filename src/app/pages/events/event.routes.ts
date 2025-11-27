import { Routes } from '@angular/router';

export default [
    {
        path: 'event-component',
        data: { breadcrumb: 'Events List' },
        loadComponent: () => import('./event-component').then((c) => c.EventComponent)
    },
    {
        path: 'event-new',
        data: { breadcrumb: 'New Event' },
        loadComponent: () => import('./event-new').then((c) => c.NewEvent)
    },
    {
        path: 'event-edit/:id',
        data: { breadcrumb: 'Edit Event' },
        loadComponent: () => import('./event-edit').then((c) => c.EditEvent)
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

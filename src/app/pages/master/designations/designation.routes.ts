    import { Routes } from '@angular/router';

export default [    
    { path: 'designationstable', data: { breadcrumb: 'Designation List' }, loadComponent: () => import('./designation-table').then((c) => c.DesignationTable) },
    { path: 'designation-new', data: { breadcrumb: 'New Designation' }, loadComponent: () => import('./designation-new').then((c) => c.NewDesignation) },
    { path: 'designation-edit', data: { breadcrumb: 'Edit Designation' }, loadComponent: () => import('./designation-edit').then((c) => c.EditDesignation) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

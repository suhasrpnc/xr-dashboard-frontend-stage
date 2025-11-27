import { Routes } from '@angular/router';

export default [    
    { path: 'admintable', data: { breadcrumb: 'Admin List' }, loadComponent: () => import('./admin-table').then((c) => c.AdminTable) },
    { path: 'admin-new', data: { breadcrumb: 'New Admin' }, loadComponent: () => import('./admin-new').then((c) => c.NewAdmin) },
    { path: 'admin-edit', data: { breadcrumb: 'Edit Admin' }, loadComponent: () => import('./admin-edit').then((c) => c.EditAdmin) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

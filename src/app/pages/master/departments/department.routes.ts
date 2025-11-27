    import { Routes } from '@angular/router';

export default [    
    { path: 'departmentstable', data: { breadcrumb: 'Department List' }, loadComponent: () => import('./department-table').then((c) => c.DepartmentTable) },
    { path: 'department-new', data: { breadcrumb: 'New Department' }, loadComponent: () => import('./department-new').then((c) => c.NewDepartment) },
    { path: 'department-edit', data: { breadcrumb: 'Edit Department' }, loadComponent: () => import('./department-edit').then((c) => c.EditDepartment) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

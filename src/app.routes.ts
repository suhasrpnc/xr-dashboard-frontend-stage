import { Routes } from '@angular/router';
import { AppLayout } from '@/layout/components/app.layout';
import { authGuard } from '@/layout/guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('@/pages/auth/auth.routes') },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [   
            { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
            {
                path: 'dashboards',
                data: { breadcrumb: 'Dashboard Analytics' },
                loadChildren: () => import('@/pages/dashboard/dashboard.routes')
            },
            {
                path: 'departments',
                data: { breadcrumb: 'Departments' },
                loadChildren: () => import('@/pages/master/departments/department.routes')
            },
            {
                path: 'designations',
                data: { breadcrumb: 'Designations' },
                loadChildren: () => import('@/pages/master/designations/designation.routes')
            },
            {
                path: 'user',
                data: { breadcrumb: 'User' },
                loadChildren: () => import('@/pages/users/user.routes')
            },
            {
                path: 'trainer',
                data: { breadcrumb: 'Trainer' },
                loadChildren: () => import('@/pages/trainer/trainer.routes')
            },
            {
                path: 'admin',
                data: { breadcrumb: 'Admin' },
                loadChildren: () => import('@/pages/admin/admin.routes')
            },
            {
                path: 'trainingmodule',
                data: { breadcrumb: 'Content Hub' },
                loadChildren: () => import('@/pages/trainingmodule/trainingmodule.routes')
            },
            {
                path: 'events',
                data: { breadcrumb: 'Event Hub'},
                loadChildren: () => import('@/pages/events/event.routes')
            },
            {
                path: 'modules',
                data: { breadcrumb: 'Modules' },
                loadChildren: () => import('@/pages/modules/moduleroutes')
            },
             {
                path: 'certificates',
                data: { breadcrumb: 'Certifications' },
                loadChildren: () => import('@/pages/certificates/certificateroutes')
            }
        ]
    },
    {
        path: 'notfound',
        loadComponent: () => import('@/pages/notfound/notfound').then((c) => c.Notfound)
    },
    { path: '**', redirectTo: '/notfound' }
];
import { Routes } from '@angular/router';

export default [
     { path: '', redirectTo: 'xr-dashboard', pathMatch: 'full' },
     { path: 'xr-dashboard', data: { breadcrumb: 'Analytics Overview' }, loadComponent: () => import('./xr-dashboard/xrdashboard').then((c) => c.xrDashboard) },
     { path: 'module-insights', data: { breadcrumb: 'Module Insights' }, loadComponent: () => import('./module-insights/moduleinsights').then((c) => c.ModuleInsights) }

] as Routes;

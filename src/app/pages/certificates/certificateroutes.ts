import { Routes } from '@angular/router';

export default [
  { path: 'certificatecomponent', data: { breadcrumb: 'Certificate Management' },loadComponent: () => import('./certificatecomponent').then((c) => c.CertificateComponent)},
  { path: 'certificate-new', data: { breadcrumb: 'New Certificate' }, loadComponent: () => import('./certificate-new').then((c) => c.NewCertificate) },
  { path: '**', redirectTo: '/notfound',
  },
] as Routes;
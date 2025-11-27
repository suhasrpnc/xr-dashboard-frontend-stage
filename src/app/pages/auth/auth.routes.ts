import {Routes} from '@angular/router';

export default [
    { path: '', loadComponent: () => import('./login').then((c) => c.Login) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

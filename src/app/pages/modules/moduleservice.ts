import { Injectable } from '@angular/core';
import { AppModule } from './modulemodel';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private allModules: AppModule[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview and quick insights',
      icon: 'pi pi-home',
      route: '/dashboard',
      rolesAllowed: ['Admin', 'User'],
      color: '#007ad9'
    },
    {
      id: 'events',
      title: 'Events',
      description: 'Manage and view all scheduled events',
      icon: 'pi pi-calendar',
      route: '/events',
      rolesAllowed: ['Admin', 'Manager']
    },
    {
      id: 'training',
      title: 'Training',
      description: 'Access learning and training materials',
      icon: 'pi pi-book',
      route: '/training',
      rolesAllowed: ['Admin', 'Trainer', 'User']
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Data analytics and insights',
      icon: 'pi pi-chart-line',
      route: '/analytics',
      rolesAllowed: ['Admin']
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Generate and view reports',
      icon: 'pi pi-file',
      route: '/reports',
      rolesAllowed: ['Admin', 'Manager']
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Manage app configuration and preferences',
      icon: 'pi pi-cog',
      route: '/settings',
      rolesAllowed: ['Admin']
    }
  ];

  getModulesForRole(role: string): AppModule[] {
    return this.allModules.filter(m => m.rolesAllowed.includes(role));
  }
}

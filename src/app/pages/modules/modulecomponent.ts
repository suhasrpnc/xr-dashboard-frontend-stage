import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModuleService } from './moduleservice';
import { AppModule } from './modulemodel';
import { DialogModule } from 'primeng/dialog';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-modules',
  styleUrls: ['./modulecomponent.scss'],
  standalone: true,
  imports: [CommonModule,DialogModule], // ✅ Required for ngIf, ngFor, ngStyle
  template: `
    <div class="module-container">
      <h2 class="page-title">Modules</h2>

      <div class="module-grid">
        <div
          class="module-card"
          *ngFor="let module of modules"
          (click)="onClickModule()"
        >
          <div
            class="icon-wrapper"
            [ngStyle]="{ background: module.color || '#007ad9' }"
          >
            <i class="{{ module.icon }}"></i>
          </div>

          <div class="module-info">
            <h3>{{ module.title }}</h3>
            <p>{{ module.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <p-dialog header="Available Soon" [(visible)]="displayFeature" [style]="{ width: '350px' }" [modal]="true">
        <div class="flex items-center justify-center">
          <i class="pi pi-exclamation-circle mr-6" style="font-size: 2rem"></i>
          <span> This feature is currently under development and will be available soon.</span>
        </div>
       
      </p-dialog>
  `,
 
})
export class ModuleComponent implements OnInit {
  modules: AppModule[] = [];
  userRole: string = 'Admin';
  displayFeature: boolean=false;

  constructor(private moduleService: ModuleService, private router: Router) {}

  ngOnInit(): void {
    this.modules = this.moduleService.getModulesForRole(this.userRole);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onClickModule(){
    this.displayFeature=true;
  }

}

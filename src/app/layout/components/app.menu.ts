import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-menu, [app-menu]',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu" #menuContainer>
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul>
  `
})
export class AppMenu implements OnInit {
  el: ElementRef = inject(ElementRef);
  @ViewChild('menuContainer') menuContainer!: ElementRef;

  model: MenuItem[] = [];
  private menuService = inject(MenuService);

  ngOnInit() {
    const role = sessionStorage.getItem('role') || 'User'; // from login
    this.menuService.getMenuForRole(role).subscribe(menu => {
      this.model = menu;
    });
  }
}

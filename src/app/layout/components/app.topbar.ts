import { Component, computed, ElementRef, inject, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/layout/service/layout.service';
import { Ripple } from 'primeng/ripple';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MegaMenuModule } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: '[app-topbar]',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, FormsModule, Ripple, ButtonModule, MegaMenuModule, BadgeModule, TooltipModule],
    template: `
        <div class="layout-topbar-start">
            <a class="layout-topbar-logo" style="display: flex; align-items: center; height: 100%;">
                <img 
                    src="/images/logo/XRDashboardLogoWhite.png" 
                    alt="XR Dashboard Logo White" 
                    class="layout-topbar-logo-full layout-topbar-logo-slim"
                    style="height: 30px; width: auto; display: block;"
                    onerror="this.style.display='none';"
                />
                <img 
                    src="/images/logo/Dashboard.png" 
                    alt="Dashboard Logo" 
                    style="height: 15px; width: auto; display: block; margin-right: 1rem;"
                    onerror="this.style.display='none';"
                />
                <span 
                    *ngIf="false"
                    style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 56px; 
                        width: 56px;
                        border-radius: 50%; 
                        background: #F9D648;
                        margin-left: 1rem;
                        font-size: 2rem;
                        color: #272727;"
                >
                    <i class="pi pi-chevron-left"></i>
                </span>
            </a>

            <a #menuButton class="layout-menu-button" (click)="onMenuButtonClick()">
                <i class="pi pi-chevron-right"></i>
            </a>

            <button class="app-config-button app-config-mobile-button" (click)="toggleConfigSidebar()">
                <i class="pi pi-cog"></i>
            </button>

            <a #mobileMenuButton class="layout-topbar-mobile-button" (click)="onTopbarMenuToggle()">
                <i class="pi pi-ellipsis-v"></i>
            </a>
        </div>

        <div class="layout-topbar-end ">
            <div class="layout-topbar-actions-start">
            </div>
            <div class="layout-topbar-actions-end flex">
                <ul class="layout-topbar-items">
                    <li style="margin-right: 4rem;">
                        <a 
                            pStyleClass="@next"
                            enterFromClass="hidden"
                            enterActiveClass="animate-scalein"
                            leaveToClass="hidden"
                            leaveActiveClass="animate-fadeout"
                            [hideOnOutsideClick]="true"
                            style="background: transparent !important; box-shadow: none !important;"
                            class="flex items-center hover:bg-transparent focus:bg-transparent active:bg-transparent transition-none"
                        >
                            <img src="/images/avatar/user.png" alt="avatar" class="w-8 h-8" />
                            <div class="flex flex-col ml-4">
                                <span class="text-sm font-bold whitespace-nowrap">{{ username }}</span>
                                <span class="text-xs text-color-secondary text-nowrap">{{ role }}</span>
                            </div>
                        </a>
                        <div class="hidden">
                            <ul class="list-none p-0 m-0">
                                <li pTooltip="Settings" [tooltipDisabled]="isTooltipDisabled()">
                                    <a class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2" pRipple>
                                        <i class="pi pi-cog mr-2"></i>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li pTooltip="Support" [tooltipDisabled]="isTooltipDisabled()">
                                    <a class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2" pRipple>
                                        <i class="pi pi-compass mr-2"></i>
                                        <span>Support</span>
                                    </a>
                                </li>
                                <li pTooltip="Logout" [tooltipDisabled]="isTooltipDisabled()">
                                    <a class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2" pRipple (click)="logout()">
                                        <i class="pi pi-power-off mr-2"></i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
    host: {
        class: 'layout-topbar'
    },
    styles: `
        :host ::ng-deep .p-overlaybadge .p-badge {
            outline-width: 0px;
        }
    `
})
export class AppTopbar {
    layoutService = inject(LayoutService);
    private router = inject(Router);

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;

    // Add properties for username and role, reading from sessionStorage
    get username(): string | null {
        return sessionStorage.getItem('username');
    }

    get role(): string | null {
        return sessionStorage.getItem('role');
    }

    isTooltipDisabled = computed(() => !this.layoutService.isSlim());
    model: MegaMenuItem[] = [];

    logout() {
        // Clear all session storage values
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('m_login_token');
        sessionStorage.removeItem('m_user_id');
        // Navigate to login page
        this.router.navigate(['/auth']);
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {
        this.layoutService.openRightMenu();
    }

    toggleConfigSidebar() {
        let layoutState = this.layoutService.layoutState();

        if (this.layoutService.isSidebarActive()) {
            layoutState.overlayMenuActive = false;
            layoutState.overlaySubmenuActive = false;
            layoutState.staticMenuMobileActive = false;
            layoutState.menuHoverActive = false;
            layoutState.configSidebarVisible = false;
        }
        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
        this.layoutService.layoutState.set({ ...layoutState });
    }

    focusSearchInput() {
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 150);
    }

    onTopbarMenuToggle() {
        this.layoutService.layoutState.update((val) => ({ ...val, topbarMenuActive: !val.topbarMenuActive }));
    }
}

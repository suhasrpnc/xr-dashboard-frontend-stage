import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LayoutService } from '@/layout/service/layout.service';
import { UserService } from '@/layout/service/user.service';

@Component({
    selector: 'kpi-widget',
    standalone: true,
    imports: [CommonModule, ButtonModule, MenuModule, ChartModule, RippleModule],
    template: `
<ng-container *ngFor="let stat of stats; let i = index">
    <div class="col-span-12 sm:col-span-6 lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl">
            <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4"
                 [ngClass]="stat.bgClass">
                <i [ngClass]="stat.icon" class="text-2xl text-white"></i>
            </div>
            <span class="text-gray-500 dark:text-gray-300 text-sm mb-1">{{ stat.title }}</span>
            <span class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ stat.value }}</span>
            <span *ngIf="stat.subValue" class="text-xs text-gray-400 mt-1">{{ stat.subValue }}</span>
        </div>
    </div>
</ng-container>
`,
    host: {
        class: 'col-span-12 grid grid-cols-12 gap-4'
    }
})
export class kpiwidget implements OnInit {

    layoutService = inject(LayoutService);
    userService = inject(UserService);
    userAnalytics: any;

    stats = [
        {
            icon: 'pi pi-users',
            title: 'Total Users',
            value: '0',
            bgClass: 'bg-teal-500'
        },

        {
            icon: 'pi pi-user-edit',
            title: 'Total Trainers',
            value: '0',
            bgClass: 'bg-pink-500'
        },
        {
            icon: 'pi pi-sitemap',
            title: 'Total Departments',
            value: '0',
            bgClass: 'bg-blue-500'
        },
        {
            icon: 'pi pi-calendar',
            title: 'Total Events',
            value: '0',
            bgClass: 'bg-orange-500'
        },
        {
            icon: 'pi pi-check-circle',
            title: 'Training Completed',
            value: '0',
            subValue: undefined,
            bgClass: 'bg-green-500'
        }
    ];

    ngOnInit(): void {
        const userID = sessionStorage.getItem('m_user_id');
        if (userID) {
            this.userService.getUserAnalytics(Number(userID)).subscribe((response: any) => {
                this.userAnalytics = response;
                
                const analytics = response && response.m_analytics ? response.m_analytics : {};

                this.stats = [
                    {
                        icon: 'pi pi-users',
                        title: 'Total Users',
                        value: String(analytics.totalUsers ?? 0),
                        bgClass: 'bg-teal-500'
                    },
                    {
                        icon: 'pi pi-user-edit',
                        title: 'Total Trainers',
                        value: String(analytics.totalTrainers ?? 0),
                        bgClass: 'bg-pink-500'
                    },
                    {
                        icon: 'pi pi-sitemap',
                        title: 'Total Departments',
                        value: String(analytics.totalDepartments ?? 0),
                        bgClass: 'bg-blue-500'
                    },
                    {
                        icon: 'pi pi-calendar',
                        title: 'Total Events',
                        value: String(analytics.totalEvents ?? 0),
                        bgClass: 'bg-orange-500'
                    },
                    {
                        icon: 'pi pi-check-circle',
                        title: 'Training Completed',
                        value: String(analytics.trainingCompleted ?? 0),
                        subValue: undefined, // Add Pending if available in analytics
                        bgClass: 'bg-green-500'
                    }
                ];
            });
        }
    }
}

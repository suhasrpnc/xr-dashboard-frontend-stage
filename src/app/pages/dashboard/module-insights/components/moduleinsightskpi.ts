import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'module-insights-kpi',
    standalone: true,
    imports: [CommonModule, ButtonModule, MenuModule, ChartModule, RippleModule],
    template: `
<ng-container *ngFor="let stat of stats">
    <div class="col-span-12 sm:col-span-6 lg:col-span-2">
        <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl">
            <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4" [ngClass]="stat.bgClass">
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
export class ModuleInsightsKpi implements OnInit, OnDestroy {

    layoutService = inject(LayoutService);

    stats = [
        {
            icon: 'pi pi-book',               // Represents total training modules
            title: 'Total Modules',
            value: '48',
            bgClass: 'bg-blue-500'
        },
        {
            icon: 'pi pi-chart-line',         // Represents completion rate
            title: 'Average Completion Rate',
            value: '86%',
            subValue: '↑ 4% vs last month',
            bgClass: 'bg-green-500'
        },
        {
            icon: 'pi pi-clock',              // Represents average time spent per module
            title: 'Avg. Time per Module',
            value: '42 mins',
            bgClass: 'bg-indigo-500'
        },
        {
            icon: 'pi pi-users',              // Represents users enrolled across modules
            title: 'Total Enrollments',
            value: '1,280',
            bgClass: 'bg-teal-500'
        },
        {
            icon: 'pi pi-star',               // Represents high-rated modules
            title: 'High Rated Modules',
            value: '12',
            subValue: 'Rating ≥ 4.5',
            bgClass: 'bg-yellow-500'
        }
    ];

    ngOnInit(): void {
        // Reserved for dynamic data loading in future (API or service call)
    }

    ngOnDestroy(): void {
        // Reserved for cleanup if subscriptions are added later
    }
}

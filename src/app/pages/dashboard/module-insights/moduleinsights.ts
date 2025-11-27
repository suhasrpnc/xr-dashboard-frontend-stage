import { Component } from '@angular/core';
import { ModuleInsightsKpi } from './components/moduleinsightskpi';
import { ModuleInsightsChart } from './components/moduleinsightschart';

@Component({
    selector: 'app-module-insights',
    standalone: true,
    imports: [ModuleInsightsKpi, ModuleInsightsChart],
    template: `
        <div class="employee-insights-section px-6 py-4 col-span-12">
            <!-- Section Header -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-3">
                    <i class="pi pi-chart-line text-teal-600 text-2xl"></i>
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                        Module Insights
                    </h2>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400 italic">
                    Overview of training and performance metrics
                </span>
            </div>

            <!-- Widgets Grid -->
            <div class="grid grid-cols-12 gap-8">
                <module-insights-kpi class="col-span-12"></module-insights-kpi>
                <module-insights-chart class="col-span-12"></module-insights-chart>
            </div>
        </div>
    `,
    styles: [`
        .employee-insights-section {
            background: linear-gradient(to bottom right, #f9fafb, #ffffff);
            border-radius: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .dark .employee-insights-section {
            background: linear-gradient(to bottom right, #1f2937, #111827);
            box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
        }
    `]
})
export class ModuleInsights {}

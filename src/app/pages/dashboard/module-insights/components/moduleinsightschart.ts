import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'module-insights-chart',
    standalone: true,
    imports: [CommonModule, ChartModule],
    template: `
        <div class="chart-widget grid grid-cols-12 gap-6">

            <!-- Training Completion Bar Chart -->
            <div class="col-span-12 lg:col-span-8">
                <div
                    class="chart-card bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Training Completed (Last 12 Months)
                        </h3>
                    </div>
                    <p-chart type="bar" [data]="barData" [options]="barOptions" height="300"></p-chart>
                </div>
            </div>

            <!-- Pass vs Fail Doughnut Chart -->
            <div class="col-span-12 lg:col-span-4">
                <div
                    class="chart-card bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 dark:border-gray-700">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Pass vs Fail (Last 12 Months)
                        </h3>
                    </div>
                    <p-chart type="doughnut" [data]="doughnutData" [options]="doughnutOptions" height="300"></p-chart>
                </div>
            </div>

        </div>
    `,
    styles: [`
        .chart-widget {
            padding: 1rem;
        }
        .chart-card {
            background: linear-gradient(to bottom right, #ffffff, #f9fafb);
        }
        .dark .chart-card {
            background: linear-gradient(to bottom right, #1f2937, #111827);
        }
    `]
})
export class ModuleInsightsChart implements OnInit {
    barData: any;
    barOptions: any;
    doughnutData: any;
    doughnutOptions: any;

    ngOnInit() {
        this.barData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Completed',
                    backgroundColor: '#10b981', // Emerald green
                    borderRadius: 6,
                    data: [35, 42, 50, 65, 70, 80, 90, 85, 95, 100, 88, 92],
                    stack: 'a'
                },
                {
                    type: 'bar',
                    label: 'Pending',
                    backgroundColor: '#f87171', // Soft red
                    borderRadius: 6,
                    data: [12, 15, 10, 8, 6, 7, 5, 6, 4, 3, 5, 4],
                    stack: 'a'
                }
            ]
        };

        this.barOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        boxWidth: 15,
                        font: {
                            family: 'Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: '#f9fafb',
                    bodyColor: '#f3f4f6'
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#6b7280'
                    },
                    grid: {
                        color: 'rgba(107,114,128,0.1)'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#6b7280'
                    },
                    grid: {
                        color: 'rgba(107,114,128,0.1)'
                    }
                }
            }
        };

        this.doughnutData = {
            labels: ['Pass', 'Fail'],
            datasets: [
                {
                    data: [85, 15],
                    backgroundColor: ['#22c55e', '#f87171'],
                    hoverBackgroundColor: ['#16a34a', '#ef4444'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }
            ]
        };

        this.doughnutOptions = {
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        font: {
                            family: 'Inter, sans-serif',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#111827',
                    titleColor: '#f9fafb',
                    bodyColor: '#f3f4f6'
                }
            }
        };
    }
}

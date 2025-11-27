import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

interface VideoItem {
    title: string;
    src: string;
    imagesmall: string;
    imagelarge: string;
}

interface PdfItem {
    title: string;
    image: string;
    src: string;
}

interface InteractiveItem {
    title: string;
    link: string;
    imagesmall: string;
    imagelarge: string;
}

@Component({
    selector: 'app-training-module',
    standalone: true,
    imports: [
        CommonModule,
        DataViewModule,
        FormsModule,
        SelectButtonModule,
        PickListModule,
        OrderListModule,
        TagModule,
        ButtonModule
    ],
    template: `
        <div class="flex flex-col">
            <div class="card">
                <div class="font-semibold text-xl">Interactive Content</div>
                <p-dataview [value]="interactiveItems" [layout]="layout">
                    <ng-template #header>
                        <div class="flex justify-end">
                            <p-select-button [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                                <ng-template #item let-option>
                                    <i
                                        class="pi"
                                        [ngClass]="{
                                            'pi-bars': option === 'list',
                                            'pi-table': option === 'grid'
                                        }"
                                    ></i>
                                </ng-template>
                            </p-select-button>
                        </div>
                    </ng-template>
                    <ng-template #list let-items>
                        <div class="flex flex-col">
                            <div
                                *ngFor="let item of items"
                                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                            >
                                <div class="md:w-40 relative">
                                    <img class="block xl:block mx-auto rounded w-full"
                                         [src]="item.imagesmall"
                                         [alt]="item.title" />
                                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px;"></div>
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-12">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <div class="text-lg font-medium mt-2">
                                                {{ item.title }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button
                                                label="Launch Now"
                                                [disabled]="false"
                                                styleClass="flex-auto md:flex-initial whitespace-nowrap"
                                                (onClick)="gotoWebGLPage(item.link, item.title)"
                                            ></p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                    <ng-template #grid let-items>
                        <div class="grid grid-cols-12 gap-4">
                            <div
                                *ngFor="let item of items"
                                class="col-span-12 sm:col-span-6 lg:col-span-4 p-2"
                            >
                                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                    <div class="relative w-full shadow-sm">
                                        <img class="rounded w-full"
                                             [src]="item.imagelarge"
                                             [alt]="item.title" />
                                        <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px;"></div>
                                    </div>
                                    <div class="pt-12">
                                        <div class="flex flex-row justify-between items-start gap-2">
                                            <div>
                                                <div class="text-lg font-medium mt-1">
                                                    {{ item.title }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-6 mt-6">
                                            <div class="flex gap-2">
                                                <p-button
                                                    label="Launch Now"
                                                    [disabled]="false"
                                                    styleClass="flex-auto md:flex-initial whitespace-nowrap"
                                                    (onClick)="gotoWebGLPage(item.link, item.title)"
                                                ></p-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                </p-dataview>
            </div>
            <div class="card">
                <div class="font-semibold text-xl">Video Content</div>
                <p-dataview [value]="videoItems" [layout]="layout">
                    <ng-template #list let-items>
                        <div class="flex flex-col">
                            <div
                                *ngFor="let item of items"
                                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                                [ngClass]="{'border-t border-surface': items[0] !== item}"
                            >
                                <div class="md:w-40 relative">
                                    <img class="block xl:block mx-auto rounded w-full" [src]="item.imagesmall" [alt]="item.title" />
                                    <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px;"></div>
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-12">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <div class="text-lg font-medium mt-2">
                                                {{ item.title }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button
                                                label="Launch Now"
                                                [disabled]="false"
                                                styleClass="flex-auto md:flex-initial whitespace-nowrap"
                                                (onClick)="gotoVideoGLPage(item.title, item.src)"
                                            ></p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                    <ng-template #grid let-items>
                        <div class="grid grid-cols-12 gap-4">
                            <div
                                *ngFor="let item of items"
                                class="col-span-12 sm:col-span-6 lg:col-span-4 p-2"
                            >
                                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                    <div class="relative w-full shadow-sm">
                                        <img class="rounded w-full" [src]="item.imagelarge" [alt]="item.title" />
                                        <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px;"></div>
                                    </div>
                                    <div class="pt-12">
                                        <div class="flex flex-row justify-between items-start gap-2">
                                            <div>
                                                <div class="text-lg font-medium mt-1">
                                                    {{ item.title }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-6 mt-6">
                                            <div class="flex gap-2">
                                                <p-button
                                                    label="Lunch Now"
                                                    [disabled]="false"
                                                    class="flex-auto md:flex-initial whitespace-nowrap"
                                                    styleClass="w-full"
                                                    (onClick)="gotoVideoGLPage(item.title, item.src)"
                                                ></p-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                </p-dataview>
            </div>
            <div class="card">
                <div class="font-semibold text-xl">Document Content</div>
                <p-dataview [value]="pdfItems" [layout]="layout">
                    <ng-template #list let-items>
                        <div class="flex flex-col">
                            <div
                                *ngFor="let item of items"
                                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                                [ngClass]="{'border-t border-surface': items[0] !== item}"
                            >
                                <div class="md:w-40 relative flex items-center justify-center">
                                    <img [src]="item.image" class="w-16 h-16 mx-auto" alt="PDF Icon" />
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-12">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <div class="text-lg font-medium mt-2">
                                                {{ item.title }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button
                                                label="Open PDF"
                                                [disabled]="false"
                                                styleClass="flex-auto md:flex-initial whitespace-nowrap"
                                                (onClick)="gotoPdfGLPage(item.title, item.src)"
                                            ></p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                    <ng-template #grid let-items>
                        <div class="grid grid-cols-12 gap-4">
                            <div
                                *ngFor="let item of items"
                                class="col-span-12 sm:col-span-6 lg:col-span-4 p-2"
                            >
                                <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                    <div class="relative w-full shadow-sm flex justify-center items-center min-h-[100px]">
                                        <img [src]="item.image" class="w-16 h-16" alt="PDF Icon" />
                                    </div>
                                    <div class="pt-12">
                                        <div class="flex flex-row justify-between items-start gap-2">
                                            <div>
                                                <div class="text-lg font-medium mt-1">
                                                    {{ item.title }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-6 mt-6">
                                            <div class="flex gap-2">
                                                <p-button
                                                    label="Open PDF"
                                                    [disabled]="false"
                                                    class="flex-auto md:flex-initial whitespace-nowrap"
                                                    styleClass="w-full"
                                                    (onClick)="gotoPdfGLPage(item.title, item.src)"
                                                ></p-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                </p-dataview>
            </div>
        </div>
    `,
    styles: `
        ::ng-deep {
            .p-orderlist-list-container {
                width: 100%;
            }
        }
    `,
})
export class TrainingModule implements OnInit {
    layout: 'list' | 'grid' = 'list';

    options = ['list', 'grid'];

    interactiveItems: InteractiveItem[] = [
        {
            title: 'EasyPact',
            link: 'http://13.204.95.176:6060/images/xrdbc/webgl/easypact/index.html',
            imagesmall: '/images/xrdbc/ic_webgl/easypact/easypact_thambnail_small.png',
            imagelarge: '/images/xrdbc/ic_webgl/easypact/easypact_thambnail_large.png'
        },
        {
            title: 'BlokSeT Aluminium',
            link: 'http://13.204.95.176:6060/images/xrdbc/webgl/blockset-al/index.html',
            imagesmall: '/images/xrdbc/ic_webgl/blockset_al/blokset_al_thambnail_small.png',
            imagelarge: '/images/xrdbc/ic_webgl/blockset_al/blokset_al_thambnail_large.png'
        },
        {
            title: 'BlokSeT Copper',
            link: 'http://13.204.95.176:6060/images/xrdbc/webgl/blockset-cu/index.html',
            imagesmall: '/images/xrdbc/ic_webgl/blockset_co/blokset_co_thambnail_small.png',
            imagelarge: '/images/xrdbc/ic_webgl/blockset_co/blokset_co_thambnail_large.png'
        },
        {
            title: 'Product-Assembly',
            link: 'http://13.204.95.176:6060/images/xrdbc/webgl/product-assembly/index.html',
            imagesmall: '/images/xrdbc/ic_webgl/product_assembly/product_thambnail_small.png',
            imagelarge: '/images/xrdbc/ic_webgl/product_assembly/product_thambnail_large.png'
        }
    ];

    videoItems: VideoItem[] = [
        {
            title: 'Ladder Safety Animation',
            imagesmall: '/images/xrdbc/vc_mp4/LadderSafety/LadderSafety_small.png',
            imagelarge: '/images/xrdbc/vc_mp4/LadderSafety/LadderSafety_large.png',
            src: '/images/xrdbc/vc_mp4/LadderSafety/Ladder Safety Animation.mp4'
        },
        {
            title: 'Safety with fun Animation',
            imagesmall: '/images/xrdbc/vc_mp4/Safety/Safety_small.png',
            imagelarge: '/images/xrdbc/vc_mp4/Safety/Safety_large.png',
            src: '/images/xrdbc/vc_mp4/Safety/Safety with fun Animation.mp4'
        }
    ];
    
    pdfItems: PdfItem[] = [
        {
            title: 'Confined Space',
            image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg',
            src: '/images/xrdbc/dc_pdf/Confined Space'
        },
        {
            title: 'Safety with fun Animation.pdf',
            image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg',
            src: '/images/xrdbc/dc_pdf/Fire Safety.pdf'
        }
    ];

  

    constructor(private router: Router) {}
        
    ngOnInit() {}
       
     
      

   // add this helper inside TrainingModule class
private encodeToken(url: string): string {
    // Base64 encode then make URL-safe
    return encodeURIComponent(btoa(url));
}

// replace gotoWebGLPage with this
gotoWebGLPage(link?: string, title?: string) {
    if (link) {
        const token = this.encodeToken(link);
        this.router.navigate(['/trainingmodule/webgl'], {
            queryParams: { token, title: title || 'Interactive Content' }
        });
    } else {
        this.router.navigate(['/trainingmodule/webgl']);
    }
}

    gotoVideoGLPage(title?: string, src?: string) {
        // Store video info in navigation state or URL for retrieval in video route
        this.router.navigate(['/trainingmodule/video'], {
            queryParams: title && src ? { title, src } : undefined,
        });
    }

    gotoPdfGLPage(title?: string, src?: string) {
        debugger
        // Store PDF info in navigation state or URL for retrieval in PDF route
        this.router.navigate(['/trainingmodule/pdf'], {
            queryParams: title && src ? { title, src } : undefined,
        });
    }
}
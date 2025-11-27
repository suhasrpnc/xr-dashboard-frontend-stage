import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {LayoutService} from "@/layout/service/layout.service";

@Component({
    standalone: true,
    selector: '[app-footer]',
    imports: [ButtonModule],
    template: ` <span class="font-medium text-lg text-muted-color">
              <div class="flex items-center justify-center py-4" >
                <p class="text-sm md:text-base text-gray-600">
                 © 2025 Designed & Developed by CHRP-INDIA Pvt. Ltd
                </p>
        </div>

    </span>
        <div class="flex gap-2">
            <button pButton icon="pi pi-github" rounded text severity="secondary"></button>
            <button pButton icon="pi pi-facebook" rounded text severity="secondary"></button>
            <button pButton icon="pi pi-twitter" rounded text severity="secondary"></button>
        </div>`,
    host: {
        class: 'layout-footer'
    }
})
export class AppFooter {
    layoutService = inject(LayoutService);
}
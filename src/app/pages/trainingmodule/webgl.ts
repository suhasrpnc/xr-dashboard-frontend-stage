// src/app/pages/training/webgl.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-webgl',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
            <div class="p-4">
            <div *ngIf="loading" class="text-center">Loading interactive content...</div>

            <div *ngIf="error" class="text-red-600">
                {{ error }}
            </div>

            <div *ngIf="sanitizedUrl && !error" class="webgl-frame mt-4">
                <iframe
                    [src]="sanitizedUrl"
                    width="100%"
                    height="800"
                    frameborder="0"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                ></iframe>
            </div>
        </div>
    `,
    styles: [`
        .webgl-frame { width: 100%; min-height: 600px; }
    `]
})
export class webgl implements OnInit {
    title = '';
    sanitizedUrl?: SafeResourceUrl;
    loading = true;
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const token = params['token'];
            this.title = params['title'] || 'Interactive Content';

            if (token) {
                try {
                    // Decode the Base64 + URL-encoded string
                    const decoded = atob(decodeURIComponent(token));

                    // Optional: restrict allowed domains for safety
                    if (!this.isAllowedUrl(decoded)) {
                        this.error = 'Access blocked for external content';
                        this.loading = false;
                        return;
                    }

                    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decoded);
                    this.loading = false;
                } catch {
                    this.error = 'Invalid content token';
                    this.loading = false;
                }
            } else {
                this.error = 'No content specified';
                this.loading = false;
            }
        });
    }

    private isAllowedUrl(url: string): boolean {
        try {
            const parsed = new URL(url);
            const allowedHosts = [
                window.location.hostname, // same host
                '13.204.95.176'           // your server IP
            ];
            return allowedHosts.includes(parsed.hostname);
        } catch {
            return false;
        }
    }

    goBack() {
        this.router.navigate(['/trainingmodule']);
    }
}

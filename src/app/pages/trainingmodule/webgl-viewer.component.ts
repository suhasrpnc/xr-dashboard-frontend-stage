// src/app/pages/training/webgl-viewer.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-webgl-viewer',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button pButton type="button" label="Back" (click)="back()"></button>
      </div>

      <div *ngIf="loading" class="text-center">Loading...</div>

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
export class WebGLViewerComponent implements OnInit {
  title = 'WebGL';
  sanitizedUrl?: SafeResourceUrl;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];        // token from TrainingModule
      this.title = params['title'] || 'WebGL';

      if (token) {
        try {
          const decoded = atob(decodeURIComponent(token));
          // Validate that decoded URL is allowed (optional but recommended)
          if (!this.isAllowedUrl(decoded)) {
            this.error = 'Blocked URL';
            this.loading = false;
            return;
          }
          // Trust the URL for iframe usage
          this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decoded);
          this.loading = false;
        } catch (e) {
          this.error = 'Invalid token';
          this.loading = false;
        }
      } else {
        this.error = 'No content specified';
        this.loading = false;
      }
    });
  }

  back() {
    this.router.navigate(['/trainingmodule']);
  }

  private isAllowedUrl(url: string): boolean {
    // Only allow known hosts / same-origin. Adjust allowedHosts as needed.
    try {
      const parsed = new URL(url);
      const allowedHosts = [
        window.location.hostname, // same host
        '13.204.95.176'           // explicit IP you use
        // add any other allowed hostnames
      ];
      return allowedHosts.includes(parsed.hostname);
    } catch {
      return false;
    }
  }
}

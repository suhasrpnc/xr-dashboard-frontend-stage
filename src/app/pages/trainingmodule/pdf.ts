import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <ng-container *ngIf="safePdfUrl; else missing">
        <iframe 
          [src]="safePdfUrl"
          class="w-full"
          height="700"
          width="100%"
          title="PDF Viewer"
          frameborder="0"
        ></iframe>
      </ng-container>
      <ng-template #missing>
        <div class="text-center py-14 text-gray-600">
          PDF file not found.<br>
          <button
            class="mt-6 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
            (click)="goBack()"
          >
            Back
          </button>
        </div>
      </ng-template>
    </div>
  `
})
export class pdf implements OnInit {
  pdfUrl?: string;
  safePdfUrl?: SafeResourceUrl;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Get the PDF src path from query params
      let src: string | undefined = params['src'] || undefined;

      // If user passed src without .pdf extension, add it
      if (typeof src === 'string' && !src.toLowerCase().endsWith('.pdf')) {
        src += '.pdf';
      }

      // Make sure the path starts with '/', for our /public/ assets
      if (typeof src === 'string' && src.startsWith('/')) {
        // Directly embed the PDF in the iframe (let the browser handle PDF rendering)
        this.pdfUrl = src;
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
      } else {
        this.pdfUrl = undefined;
        this.safePdfUrl = undefined;
      }
    });
  }

  goBack() {
    this.router.navigate(['/trainingmodule']);
  }
}
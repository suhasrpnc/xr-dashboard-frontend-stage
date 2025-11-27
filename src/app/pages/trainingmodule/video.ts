import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
    <div *ngIf="videoTitle" class="mt-4 text-4xl font-semibold text-center">
        {{ videoTitle }}
      </div>
      <video 
        width="1200"
        height="500" 
        controls
        class="rounded-lg shadow"
      >
        <source [src]="videoSrc" type="video/mp4">
        Your browser does not support the video tag.
      </video>      
    </div>
  `
})
export class video implements OnInit {
  videoSrc: string = '/images/xrdbc/vc_mp4/Ladder Safety Animation.mp4';
  videoTitle?: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const src = params.get('src');
      const title = params.get('title');
      if (src) {
        this.videoSrc = src;
      }
      if (title) {
        this.videoTitle = title;
      }
    });
  }
}
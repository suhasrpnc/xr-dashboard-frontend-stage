import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UploaderComponent } from '@/apps/files/uploader/uploader';
import { environment } from 'public/config/environment';
import { FileService } from '@/layout/service/file.service';
import { UserService } from '@/layout/service/user.service';
import { MessageService } from 'primeng/api';
    
@Component({
    selector: 'app-import-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        UploaderComponent
    ],
    template: `
        <div class="employee-form-container">
            <div class="text-xl font-semibold mb-3 text-center text-white bg-primary py-2 rounded-md">
                Upload User Data
            </div>

            <div class="text-xl font-semibold mb-4">
                <button pButton icon="pi pi-download" label="Download Excel Template (Sample File)" class="p-button-success w-full" (click)="downloadTemplate()"></button>
            </div>

            <div class="card !p-0 mb-4">
                <app-file-uploader (fileSelected)="onFileSelected($event)"></app-file-uploader>
            </div>

            <div class="mt-4 flex gap-2">
                <button pButton class="flex-1 p-button-danger" icon="pi pi-times" label="Cancel" (click)="cancel()"></button>
                <button pButton class="flex-1 p-button-primary" icon="pi pi-upload" label="Upload" (click)="uploadFile()" [disabled]="!selectedFile || isUploading"></button>
            </div>

            <p *ngIf="uploadProgress > 0" class="mt-2 text-center">Progress: {{ uploadProgress }}%</p>
        </div>
    `,
    styles: [`
        .employee-form-container {
            max-width: 800px;
            margin: 1rem auto;
            background: #ffffff;
            border-radius: 1rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            padding: 1.5rem;
        }
    `]
})
export class ImportUser {

    constructor(    
        private fileService: FileService,
        private http: HttpClient,
        private router: Router,
        private messageService: MessageService
    ) {}

    selectedFile: File | null = null;
    uploadProgress = 0;
    isUploading = false;

    onFileSelected(file: File | null) {
        this.selectedFile = file;
    }

    uploadFile() {
        if (!this.selectedFile) {
            this.showToast('Please select a file first!', 'error');
            return;
        }
        
        this.isUploading = true;

        this.fileService.importUserExcel(this.selectedFile).subscribe({
            next: (event) => {
                if (event.type === HttpEventType.UploadProgress && event.total) {
                    this.uploadProgress = Math.round((event.loaded / event.total) * 100);
                } else if (event.type === HttpEventType.Response) {
                    this.isUploading = false;
                    const body: any = event.body;
                    if (body && typeof body.success !== 'undefined') {
                        if (body.failed && body.failed > 0) {
                            let errorMessages = '';
                            if (Array.isArray(body.errors) && body.errors.length > 0) {
                                errorMessages = body.errors.map((e: any) =>
                                    `Row ${e.row}: ${e.errors}`
                                ).join('\n');
                            }
                            this.showToast(
                                `Users imported: ${body.success}, Failed: ${body.failed}.\n${errorMessages || 'Check your file.'}`,
                                'warn'
                            );
                        } else {
                            this.showToast(`Users imported successfully! Total: ${body.success}`, 'success');
                        }
                    } else {
                        this.showToast('Users imported successfully!', 'success');
                    }
                    this.router.navigate(['/user/usertable']);
                }
            },
            error: (err) => {
                this.isUploading = false;
                this.showToast('Upload failed. Please try again.', 'error');
                console.error('Upload error:', err);
            }
        });
    }

    // Helper method for showing toast (uses PrimeNG MessageService)
    showToast(message: string, severity: 'success' | 'info' | 'warn' | 'error' = 'info') {
        // You should inject MessageService in your constructor for this to work
        // Example: private messageService: MessageService
        this.messageService.add({ severity, summary: '', detail: message });
    }

    cancel() {
        this.router.navigate(['/user/usertable']);
    }

    downloadTemplate() {
        this.fileService.downloadUserTemplate().subscribe((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'User Templete.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}

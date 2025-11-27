import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

interface Image {
    name: string;
    objectURL: string;
}

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    imports: [ToastModule, FileUploadModule, CommonModule, ButtonDirective, Ripple],
    template: `
        <p-toast key="fu"></p-toast>
        <div class="card">
            <p-fileupload
                #fileUploader
                name="demo[]"
                accept=".xlsx,.xls"
                [customUpload]="true"
                (onSelect)="onSelect($event)"
                [multiple]="false"
                [showUploadButton]="false"
                [showCancelButton]="false"
                [auto]="true"
                class="upload-button-hidden w-full"
            >
                <ng-template #content>
                    <div class="w-full py-4" (click)="fileUploader.advancedFileInput.nativeElement.click()">
                        <div *ngIf="!uploadedFiles.length" class="flex flex-col justify-center items-center">
                            <i class="pi pi-upload text-surface-900 text-2xl mb-4"></i>
                            <span class="font-bold text-surface-900 text-xl mb-4">Upload User File</span>
                            <span class="text-surface-600 text-md text-center">Drop or select Excel file</span>
                        </div>
                        <div *ngIf="uploadedFiles.length">
                            <div *ngFor="let file of uploadedFiles; let i = index" class="flex items-center gap-3">
                                <i class="pi pi-file-excel text-green-600 text-2xl"></i>
                                <span>{{ file.name }}</span>
                                <button
                                    [id]="file.name"
                                    #buttonEl
                                    pButton
                                    pRipple
                                    icon="pi pi-times"
                                    class="p-button-rounded p-button-text text-red-500"
                                    (click)="removeImage($event, file)"
                                ></button>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-fileupload>
        </div>
    `,
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .p-fileupload-header { display: none; }
        :host ::ng-deep .p-fileupload { border: none; }
        :host ::ng-deep .p-fileupload-file-list { display: none; }
    `]
})
export class UploaderComponent {
    @Output() fileSelected = new EventEmitter<File>();
    uploadedFiles: any[] = [];

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    constructor(private messageService: MessageService) {}

    onSelect(event: any) {
        const file = event.files[0];
        if (file) {
            this.uploadedFiles = [file];
            this.fileSelected.emit(file); // ✅ Notify parent
        }

        this.messageService.add({
            severity: 'info',
            summary: 'File Selected',
            detail: file?.name
        });
    }

    removeImage(event: Event, file: any) {
        event.stopPropagation();
        this.uploadedFiles = this.uploadedFiles.filter((i) => i !== file);
        this.fileSelected.emit(null!); // ✅ Notify parent that file is removed
    }
}

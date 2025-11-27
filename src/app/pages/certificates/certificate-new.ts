import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterService } from '@/layout/service/master.service';
import { UserService } from '@/layout/service/user.service';
import { CertificateService } from '@/layout/service/certificate.service';
import { FileService } from '@/layout/service/file.service';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    DatePickerModule,
    TextareaModule
  ],
  template: `
      <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <form class="grid grid-cols-1 sm:grid-cols-3 gap-6" (ngSubmit)="onSubmit()" #certificateForm="ngForm" novalidate>
          <div class="flex flex-col gap-1">
            <label for="userId" class="font-medium text-gray-800">
              User <span class="text-red-500">*</span>
            </label>
            <p-select
              id="userId"
              name="UserID"
              [options]="users"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.UserID"
              placeholder="Select User"
              class="w-full"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.UserID" class="text-red-500 text-xs">User is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="certificateId" class="font-medium text-gray-800">
              Certificate <span class="text-red-500">*</span>
            </label>
            <p-select
              id="certificateId"
              name="CertificateID"
              [options]="certificates"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.CertificateID"
              placeholder="Select Certificate"
              class="w-full"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.CertificateID" class="text-red-500 text-xs">Certificate is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="module" class="font-medium text-gray-800">Module Name <span class="text-red-500">*</span></label>
            <p-select
              id="module"
              name="Module"
              [options]="modules"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.Module"
              class="w-full"
              placeholder="Select Module Name"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.Module" class="text-red-500 text-xs">Module is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="issueDate" class="font-medium text-gray-800">Issue Date <span class="text-red-500">*</span></label>
            <p-datepicker
              id="issueDate"
              name="IssueDate"
              [(ngModel)]="formData.IssueDate"
              [showIcon]="true"
              [dateFormat]="'mm/dd/yy'"
              [class]="'w-full'"
              [style]="{'width':'100%'}"
              placeholder="Select Issue Date"
              required>
            </p-datepicker>
            <div *ngIf="formSubmitted && !formData.IssueDate" class="text-red-500 text-xs">Issue Date is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="verificationCode" class="font-medium text-gray-800">Verification Code <span class="text-red-500">*</span></label>
            <input 
              pInputText
              id="verificationCode"
              type="text"
              name="VerificationCode"
              [(ngModel)]="formData.VerificationCode"
              class="w-full"
              required
              placeholder="Enter Verification Code"
            />
            <div *ngIf="formSubmitted && !formData.VerificationCode" class="text-red-500 text-xs">Verification Code is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            
          </div>
          <div class="flex items-center gap-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="certificateMode" 
              [(ngModel)]="mode" 
              [value]="'generate'" 
              class="accent-blue-600"
            />
            <span>Generate</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="certificateMode" 
              [(ngModel)]="mode" 
              [value]="'upload'" 
              class="accent-blue-600"
            />
            <span>Upload</span>
            <ng-container *ngIf="mode === 'upload'">
              <div class="flex flex-col">
                <input 
                  type="file"
                  name="certificateFile"
                  accept="application/pdf"
                  (change)="onFileSelected($event)"
                  class="ml-3"
                  style="display: inline-block;"
                />
                <span *ngIf="fileError" class="text-red-500 text-xs mt-2">{{fileError}}</span>
              </div>
            </ng-container>
          </label>
        </div>
        <div class="flex flex-col gap-1">
            
          </div>
          <div class="flex flex-col gap-1 sm:col-span-2">
            <label for="remarks" class="font-medium text-gray-800">Remarks</label>
            <textarea
              pInputTextarea
              id="remarks"
              name="Remarks"
              [(ngModel)]="formData.Remarks"
              class="w-full"
              rows="3"
              placeholder="Enter any remarks (optional)">
            </textarea>
          </div>
        
        </form>
        <div class="flex justify-end gap-3 mt-8">
        <button pButton type="button" label="Cancel" icon="pi pi-times"  class="p-button-danger p-button-danger" (click)="cancel()"></button>
        <button pButton type="submit" label="Save" icon="pi pi-save" class="p-button-success" form="ngForm" (click)="onSubmit()"></button>
        </div>
      </div>`
})
export class NewCertificate implements OnInit {
  formSubmitted: boolean = false;
  formData: any = {
    UserID: null,
    CertificateID: null,
    Module: '',
    IssueDate: null,
    VerificationCode: '',
    Remarks: ''
  };
  users: any[] = [];
  certificates: any[] = [];
  modules: any[] = [];

  // Used for upload/generation mode, file upload
  mode: 'generate' | 'upload' = 'generate';
  uploadedFile: File | null = null;
  uploadedFileName: string = '';
  fileError: string = '';

  constructor(
    private userService: UserService,
    private masterService: MasterService,
    private messageService: MessageService,
    private certificateService: CertificateService,
    private fileService: FileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        if (res && Array.isArray(res.ml_User)) {
          this.users = res.ml_User.map((user: any) => ({
            id: user.userID,
            name: user.firstName + ' ' + user.lastName
          }));
        } else {
          this.users = [];
        }
      },
      error: () => {
        this.users = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch users' });
      }
    });

    this.masterService.getMasCertificate().subscribe({
      next: (res) => {
        if (res && Array.isArray(res.ml_Certificate)) {
          this.certificates = res.ml_Certificate.map((cert: any) => ({
            id: cert.id,
            name: cert.name
          }));
        } else {
          this.certificates = [];
        }
      },
      error: () => {
        this.certificates = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch certificates' });
      }
    });

    this.masterService.getAppModules().subscribe({
      next: (res) => {
        if (res && Array.isArray(res.ml_AppModule)) {
          this.modules = res.ml_AppModule.map((mod: any) => ({
            id: mod.id,
            name: mod.name
          }));
        } else {
          this.modules = [];
        }
      },
      error: () => {
        this.modules = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch modules' });
      }
    });
  }

  cancel() {
    this.router.navigate(['/certificates/certificatecomponent']);
  }

  onSubmit() {
    this.formSubmitted = true;

    // If upload mode is selected, ensure file is selected and valid
    if (this.mode === 'upload') {
      // If no file is selected or error present, block submit
      if (!this.uploadedFile || !!this.fileError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.fileError || 'PDF file is required.' });
        return;
      }
    }

    if (
      !this.formData.UserID ||
      !this.formData.CertificateID ||
      !this.formData.Module ||
      !this.formData.IssueDate ||
      !this.formData.VerificationCode
    ) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
      return;
    }

    const nowIso = new Date().toISOString();
    let formattedIssueDate: string | null = null;
    if (this.formData.IssueDate instanceof Date) {
      const d = this.formData.IssueDate;
      formattedIssueDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
    } else if (typeof this.formData.IssueDate === 'string') {
      const d = new Date(this.formData.IssueDate);
      if (!isNaN(d.getTime())) {
        formattedIssueDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
      } else {
        formattedIssueDate = null;
      }
    } else {
      formattedIssueDate = null;
    }

    if (!formattedIssueDate) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Issue Date' });
      return;
    }

    // Prevent multiple 'File upload failed' toast messages
    let fileUploadFailedShown = false;

    if (this.mode === 'upload' && this.uploadedFile) {
      this.fileService.uploadCertificate(this.uploadedFile).subscribe({
        next: (event: any) => {
          let res: any = event.body ? event.body : event;

          // Sometimes ProgressEvent or other upload event steps are received,
          // only on completion should we actually respond.
          if (res && res.filePath) {
            this._saveCertificateEntry(res.filePath, formattedIssueDate, nowIso);
          } else if (res && res.type && res.type === 4 && res.body && res.body.filePath) {
            this._saveCertificateEntry(res.body.filePath, formattedIssueDate, nowIso);
          } else if (
            // Only show error if ProgressEvent completed
            (res && res.type === 4 && (!res.body || !res.body.filePath))
            && !fileUploadFailedShown
          ) {
            fileUploadFailedShown = true;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File upload failed' });
          }
          // else ignore progress events to prevent duplicate errors
        },
        error: () => {
          if (!fileUploadFailedShown) {
            fileUploadFailedShown = true;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File upload failed' });
          }
        }
      });
    } else if (this.mode === 'generate') {
      this._saveCertificateEntry('', formattedIssueDate, nowIso);
    }
  }

  private _saveCertificateEntry(filePath: string, formattedIssueDate: string, nowIso: string) {
    const certificatePayload = {
      id: 0,
      certificateID: this.formData.CertificateID,
      userID: this.formData.UserID,
      moduleID: this.formData.Module,
      issueDate: formattedIssueDate,
      certificateURL: filePath || '',
      qrCodeURL: '',
      verificationCode: this.formData.VerificationCode,
      isRevoked: false,
      remarks: this.formData.Remarks || '',
      createdUserID: 0,
      createdDateTime: nowIso,
      updatedUserID: 0,
      updatedDateTime: nowIso,
      isActive: true
    };

    this.certificateService.put_NewCertificate(certificatePayload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certificate entry created successfully' });
        this.router.navigate(['/certificates/certificatecomponent']);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create certificate' });
      }
    });
  }

  onFileSelected(event: any) {
    this.fileError = '';
    const file: File | null = event.target && event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (file) {
      // Validate file type (PDF) and size (<=10MB)
      if (file.type !== 'application/pdf') {
        this.uploadedFile = null;
        this.uploadedFileName = '';
        this.fileError = 'Only PDF files are allowed.';
        this.messageService.add({ severity: 'error', summary: 'Invalid file', detail: this.fileError });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        this.uploadedFile = null;
        this.uploadedFileName = '';
        this.fileError = 'File size must not exceed 10MB.';
        this.messageService.add({ severity: 'error', summary: 'File too large', detail: this.fileError });
        return;
      }

      this.uploadedFile = file;
      this.uploadedFileName = file.name;
    } else {
      this.uploadedFile = null;
      this.uploadedFileName = '';
      this.fileError = '';
    }
  }
}
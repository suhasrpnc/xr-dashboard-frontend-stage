import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MasterService } from '@/layout/service/master.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-edit-designation',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        InputTextModule, ButtonModule,DialogModule
    ],
    template: `
        <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <div class="font-bold text-2xl mb-6 text-gray-900">{{ isEditMode ? 'Edit Designation' : 'Add New Designation' }}</div>
            <form class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" (ngSubmit)="onSubmit()" #desigForm="ngForm" novalidate>
                <div class="flex flex-col gap-1">
                    <label for="designationName" class="font-medium text-gray-800">Designation Name <span class="text-red-500">*</span></label>
                    <input pInputText id="designationName" type="text" name="DesignationName" [(ngModel)]="formData.name" class="w-full" required placeholder="Enter Designation Name" />
                    <div *ngIf="formSubmitted && !formData.name" class="text-red-500 text-xs">Designation Name is required.</div>
                </div>
                <div class="flex flex-col gap-1 col-span-2">
                    <label for="designationDescription" class="font-medium text-gray-800">Description</label>
                    <input pInputText id="designationDescription" type="text" name="DesignationDescription" [(ngModel)]="formData.description" class="w-full" placeholder="Enter Description(Optional)"/>
                </div>
            </form>
            <div class="flex justify-between items-center mt-8">
                <div>
                    <!-- <button pButton type="button" label="Delete" icon="pi pi-trash" severity="danger" [style]="{ width: 'auto' }" (click)="openConfirmation()" *ngIf="designationId && designationId !== 0"></button> -->
                </div>
                <div class="flex gap-3">
                    <button pButton type="button" label="Cancel" icon="pi pi-times" class="p-button-danger" (click)="cancel()"></button>
                    <button pButton type="submit" [label]="isEditMode ? 'Update' : 'Save'" icon="pi pi-save" class="p-button-success" form="desigForm" (click)="onSubmit()"></button>
                </div>
            </div>
        </div>

        <p-dialog header="Confirm Delete" [(visible)]="displayConfirmation" [style]="{ width: '350px' }" [modal]="true">
            <div class="flex items-center justify-center">
                <i class="pi pi-exclamation-triangle mr-6" style="font-size: 2rem"></i>
                <span>Are you sure you want to delete this Designation?</span>
            </div>
            <ng-template pTemplate="footer">
                <p-button label="No" icon="pi pi-times" (click)="closeConfirmation()" severity="secondary"></p-button>
                <p-button label="Yes" icon="pi pi-check" (click)="deleteDesignation()" severity="danger" autofocus></p-button>
            </ng-template>
        </p-dialog>
    `
})
export class EditDesignation implements OnInit {
    router: Router;

    formSubmitted: boolean = false;
    designationId: number | string = 0;
    displayConfirmation: boolean = false;

    isEditMode: boolean = false;
    editId: number | null = null;

    constructor(
        private masterService: MasterService,
        private messageService: MessageService,
    ) {
        this.router = inject(Router);
    }

    formData: any = {
        name: '',
        description: '',
        createdUserID: '',
        createdDateTime:'',
        updatedUserID:''
    };

    ngOnInit() {
        const nav = this.router.getCurrentNavigation();
        const state = (nav?.extras?.state as any) || (history.state as any);
        const passed = state?.designations;

        if (passed) {
            this.isEditMode = true;
            this.editId = typeof passed.id === 'number' ? passed.id : Number(passed.id);
            this.designationId = this.editId ?? 0;
            this.formData = {
                name: passed.designationName || passed.name || '',
                description: passed.description || '',
                createdUserID: passed.createdUserID ,
                createdDateTime: passed.createdDateTime,
                updatedUserID: passed.updatedUserID,
            };
        }
    }

    onSubmit() {
        this.formSubmitted = true;

        if (
            !this.formData.name ||
            this.formData.name.trim() === ''
        ) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Designation name is required.'
            });
            return;
        }

        const userID = 999;
        const currentDate = new Date().toISOString();

        const payload = {
            messageInfo: {
                returnValue: 0,
                returnMessage: "string"
            },
            userDBConnStr: "string",
            m_OrganizationDesignation: {
                id: this.editId ?? 0,
                name: this.formData.name.trim(),
                description: this.formData.description ? this.formData.description.trim() : '',
                createdUserID: userID,
                createdDateTime: this.formData.createdDateTime,
                updatedUserID: userID,
                updatedDateTime: currentDate,
                isActive: true
            }
        };

        this.masterService.putOrganizationDesignationEdit(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Designation details updated successfully.'
                });
                this.router.navigate(['/designations/designationstable']);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create designation.'
                });
            }
        });
    }

    cancel() {
        this.router.navigate(['/designations/designationstable']);
    }

    openConfirmation() {
        this.displayConfirmation = true;
    }

    closeConfirmation() {
        this.displayConfirmation = false;
    }

    deleteDesignation() {
        if (!this.designationId || this.designationId === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Cannot delete designation. Invalid designation ID.'
            });
            this.closeConfirmation();
            return;
        }

        this.masterService.putOrganizationDesignationDelete(this.designationId as number).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Designation successfully deleted.'
                });
                this.closeConfirmation();
                this.router.navigate(['/designations/designationstable']);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete designation.'
                });
                this.closeConfirmation();
            }
        });
    }   
}
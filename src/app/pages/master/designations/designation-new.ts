import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MasterService } from '@/layout/service/master.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-new-designation',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        InputTextModule, ButtonModule
    ],
    template: `
        <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <div class="font-bold text-2xl mb-6 text-gray-900">Add New Designation</div>
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
            <div class="flex justify-end gap-3 mt-8">
                <button pButton type="button" label="Cancel" icon="pi pi-times" class="p-button-danger" (click)="cancel()"></button>
                <button pButton type="submit" label="Save" icon="pi pi-save" class="p-button-success" form="desigForm" (click)="onSubmit()"></button>
            </div>
        </div>
    `
})
export class NewDesignation {
    router: Router;

    formSubmitted: boolean = false;

    constructor(
        private masterService: MasterService,
        private messageService: MessageService,
    ) {
        this.router = inject(Router);
    }

    formData: any = {
        name: '',
        description: ''
    };

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
                id: 0,
                name: this.formData.name.trim(),
                description: this.formData.description ? this.formData.description.trim() : '',
                createdUserID: userID,
                createdDateTime: currentDate,
                updatedUserID: userID,
                updatedDateTime: currentDate,
                isActive: true
            }
        };

        this.masterService.putOrganizationDesignation(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Designation successfully created.'
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
}
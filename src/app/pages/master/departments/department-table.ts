import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';     
import { MasterService } from '@/layout/service/master.service'; 

interface Department {
    id: string | number;
    name: string;
    description: string;
    createdUserID: number;
    createdDateTime: string;
    updatedUserID: number | null;
    updatedDateTime: string | null;
    isActive: boolean;
}

@Component({
    selector: 'app-department-table',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule
    ],
    template: `
        <div class="card">            
            <p-table
                #dt1
                [value]="departments"
                dataKey="id"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                responsiveLayout="scroll"
                selectionMode="multiple"
                [(selection)]="selectedDepartments"
                [globalFilterFields]="['departmentName']"
                [metaKeySelection]="false"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-col sm:flex-row">                        
                        <div class="flex gap-2 ml-auto">
                            <p-iconfield iconPosition="left">
                                <p-inputicon>
                                    <i class="pi pi-search"></i>
                                </p-inputicon>
                                <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                            </p-iconfield>
                            <button pButton type="button" label="+ New Department" class="p-button-primary" (click)="newDepartment()"></button>
                        </div>                       
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>                        
                        <th style="min-width: 2rem">
                            <div class="flex justify-center items-center w-full text-center">
                                Sl.No.
                            </div>
                        </th>                       
                        <th style="min-width: 15rem">
                            <div class="flex justify-between items-center">
                                Department Name
                            </div>
                        </th> 
                        <th style="min-width: 30rem">
                            <div class="flex justify-between items-center">
                                Description
                            </div>
                        </th>                        
                        <th style="min-width: 5rem">
                            <div class="flex justify-between items-center">
                                Action
                            </div>
                        </th>                          
                    </tr>
                </ng-template>
                <ng-template #body let-dept let-rowIndex="rowIndex">
                    <tr>
                        <td class="text-center align-middle" style="vertical-align: middle; text-align: center;">
                            {{ rowIndex + 1 }}
                        </td>                        
                        <td>
                            {{ dept.departmentName }}
                        </td>
                        <td>
                            {{ dept.description }}
                        </td>
                        <td>
                            <button 
                                pButton 
                                type="button" 
                                icon="pi pi-pencil" 
                                class="p-button-rounded p-button-text p-button-sm mr-1" 
                                pTooltip="Edit department" 
                                (click)="editDepartment(dept)" 
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="13">No Department found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="13">Loading Department data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>`,
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, MasterService]
})
export class DepartmentTable implements OnInit {
    departments: Department[] = [];
    selectedDepartments: Department[] = [];
    loading: boolean = true;
    selectAllChecked: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    constructor(
        private masterService: MasterService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.router = inject(Router);
    }

    ngOnInit() {
        this.loading = true;
        this.masterService.getOrganizationDepartment().subscribe({
            next: (res) => {
                const apiDepartments = res?.ml_OrganizationDepartment || [];
                this.departments = apiDepartments.map((item: any) => ({
                    id: item.id,
                    departmentName: item.name || '',
                    description: item.description ?? '-',
                    createdUserID: item.createdUserID,
                    createdDateTime: item.createdDateTime,
                    updatedUserID: item.updatedUserID,
                    updatedDateTime: item.updatedDateTime,
                    isActive: item.isActive
                }));
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
            }
        });
    }    

    newDepartment() {
        this.router.navigate(['/departments/department-new']);
    }

    editDepartment(dept: Department) {
        this.selectedDepartments = [dept];
        this.router.navigate(['/departments/department-edit'], { state: { department: dept } });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
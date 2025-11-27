import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Router } from '@angular/router';
import { UserService } from '@/layout/service/user.service';
import { FileService } from '@/layout/service/file.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
interface Users {
    userID: number;
    employeeCode: string;
    employeementType: string;
    first_name: string;
    last_name: string;
    department: string;
    designation: string;
    userRoleID: number;
}

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        InputTextModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: ` <div class="card">            
            <p-table
                #dt1
                [value]="users"
                dataKey="userID"
                [rows]="10"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                responsiveLayout="scroll"
                selectionMode="multiple"
                [(selection)]="selectedUsers"
                [metaKeySelection]="false"
                [globalFilterFields]="['employeeCode', 'employeementType', 'first_name', 'last_name', 'department', 'designation']"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-col sm:flex-row w-full">
                        <div class="mb-3 flex gap-2">
                            <button pButton type="button" label="Export Selected" class="p-button-primary" (click)="exportSelected()"></button>
                            <button pButton type="button" label="Export All" class="p-button-primary" (click)="export()"></button>
                        </div>
                        <div class="flex gap-2 ml-auto">
                            <p-iconfield iconPosition="left">
                                <p-inputicon>
                                    <i class="pi pi-search"></i>
                                </p-inputicon>
                                <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                            </p-iconfield>
                            <button pButton type="button" label="Import" class="p-button-primary" (click)="import()"></button>
                            <button pButton type="button" label="+ New User" class="p-button-primary" (click)="newUser()"></button>
                        </div>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style="min-width: 5rem; text-align: center;">
                            <div class="flex flex-col items-center justify-center">                               
                                <p-tableHeaderCheckbox 
                                    styleClass="mt-2"
                                    (onChange)="onSelectAll($event)">
                                </p-tableHeaderCheckbox>
                            </div>
                        </th>
                        <th style="min-width: 5rem">
                            <div class="flex justify-between items-center">
                            User ID
                            </div>
                        </th>
                        <th style="min-width: 5rem">
                            <div class="flex justify-between items-center">
                            Employment Type
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                First Name
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Last Name
                            </div>
                        </th>
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Department
                            </div>
                        </th> 
                        <th style="min-width: 10rem">
                            <div class="flex justify-between items-center">
                                Designation
                            </div>
                        </th>                        
                        <th style="min-width: 5rem">
                            <div class="flex justify-between items-center">
                                Action
                            </div>
                        </th>                          
                    </tr>
                </ng-template>
                <ng-template #body let-users let-rowIndex="rowIndex">
                    <tr>
                        <td class="text-center align-middle" style="vertical-align: middle; text-align: center;">
                            <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                <p-tableCheckbox
                                    [style]="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }"
                                    [value]="users"
                                    (onChange)="onRowSelect($event, users)"
                                ></p-tableCheckbox>
                            </div>
                        </td>                       
                        <td>
                            {{ users.employeeCode }}
                        </td>
                        <td>
                            {{ users.employeementType }}
                        </td>
                        <td>
                            {{ users.first_name }}
                        </td>
                        <td>
                            {{ users.last_name }}
                        </td>
                        <td>
                            {{ users.department }}
                        </td>
                        <td>
                            {{ users.designation }}
                        </td>                        
                        <td class="text-center" style="vertical-align: middle;">
                            <button pButton type="button" icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-sm mr-1" pTooltip="Edit Employee" (click)="editUser(users.userID)">
                                Edit
                            </button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="13">No users found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="13">Loading users data. Please wait.</td>
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
    providers: [ConfirmationService, MessageService]
})
export class UsersTable implements OnInit {
    users: Users[] = [];
    selectedUsers: Users[] = [];

    loading: boolean = true;
    selectAllChecked: boolean = false;

    @ViewChild('filter') filter!: ElementRef;
    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private router: Router,
        private fileService: FileService
    ) {
        this.router = inject(Router);
    }

    ngOnInit() {
        this.userService.getAllUser().subscribe((response) => {
            const usersData = response.ml_User || [];
            this.users = usersData.map((emp: any, idx: any) => ({
                userID: emp.userID,
                employeeCode: emp.employeeCode,
                employeementType: emp.employeementType,
                first_name: emp.firstName,
                last_name: emp.lastName,
                department: emp.department,
                designation: emp.designation,
                userRoleID: emp.userRoleID
            }));
            this.loading = false;
        });
    }

    onSelectAll(event: any) {
        if (event.checked) {
            // select all in view
            this.selectedUsers = [...this.users];
            this.selectAllChecked = true;
        } else {
            this.selectedUsers = [];
            this.selectAllChecked = false;
        }
    }

    onRowSelect(event: any, employee: Users) {
        if (!this.selectAllChecked) {
            if (event.checked) {
                this.selectedUsers = [employee];
            } else {
                this.selectedUsers = [];
            }
        } else {
            // If select all was checked, allow multi select (leave as is)
        }
    }

    newUser() {
        this.router.navigate(['/user/user-new']);
    }

    editUser(userID: number) {
        this.router.navigate(['/user/user-edit'], { queryParams: { id: userID } });
    }

    import() {
        this.router.navigate(['/user/user-import']);
    }

    export() {
        // Download all users as Excel using FileService
        this.fileService.downloadAllUsersExcel().subscribe({
            next: (data: Blob) => {
                const url = window.URL.createObjectURL(data);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'AllUsers.xlsx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            },
            error: () => {
                this.messageService?.add({
                    severity: 'error',
                    summary: 'Download Failed',
                    detail: 'Unable to download users as Excel.'
                });
            }
        });
    }
    exportSelected() {
        // If no user is selected, show error message
        if (!this.selectedUsers || this.selectedUsers.length === 0) {
            this.messageService?.add({
                severity: 'error',
                summary: 'No users selected',
                detail: 'Please select at least one user to export.'
            });
            return;
        }
        const userIds = this.selectedUsers.map(user => user.userID);
        if (userIds.length === 0) {
            this.messageService?.add({
                severity: 'error',
                summary: 'No users selected',
                detail: 'Please select at least one user to export.'
            });
            return;
        }
        this.fileService.downloadSelectedUsersExcel(userIds).subscribe({
            next: (data: Blob) => {
                const url = window.URL.createObjectURL(data);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'SelectedUsers.xlsx';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            },
            error: () => {
                this.messageService?.add({
                    severity: 'error',
                    summary: 'Download Failed',
                    detail: 'Unable to download selected users as Excel.'
                });
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
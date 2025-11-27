import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { AdminService } from '@/layout/service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
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
    selector: 'app-admin-table',
    standalone: true,
    imports: [TableModule, InputTextModule, ButtonModule, IconFieldModule, InputIconModule, TagModule, CommonModule, FormsModule],
    template: ` <div class="card">
        <p-table
            #dt1
            [value]="employees"
            dataKey="userID"
            [rows]="10"
            [loading]="loading"
            [rowHover]="true"
            [showGridlines]="true"
            [paginator]="true"
            responsiveLayout="scroll"
            selectionMode="multiple"
            [(selection)]="selectedEmployees"
            [metaKeySelection]="false"
            [globalFilterFields]="['employeeCode', 'employeementType', 'first_name', 'last_name', 'department', 'designation']"
        >
            <ng-template #caption>
                <div class="flex justify-between items-center flex-col sm:flex-row w-full">
                    <div class="mb-3 flex gap-2"></div>
                    <div class="flex gap-2 ml-auto">
                        <p-iconfield iconPosition="left">
                            <p-inputicon>
                                <i class="pi pi-search"></i>
                            </p-inputicon>
                            <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                        </p-iconfield>
                        <button pButton type="button" label="+ New Admin" class="p-button-primary" (click)="newAdmin()"></button>
                    </div>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">Admin ID</div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">Employment Type</div>
                    </th>
                    <th style="min-width: 10rem">
                        <div class="flex justify-between items-center">First Name</div>
                    </th>
                    <th style="min-width: 10rem">
                        <div class="flex justify-between items-center">Last Name</div>
                    </th>
                    <th style="min-width: 10rem">
                        <div class="flex justify-between items-center">Department</div>
                    </th>
                    <th style="min-width: 10rem">
                        <div class="flex justify-between items-center">Designation</div>
                    </th>
                    <th style="min-width: 5rem">
                        <div class="flex justify-between items-center">Action</div>
                    </th>
                </tr>
            </ng-template>
            <ng-template #body let-employee>
                <tr>
                    <td>{{ employee.employeeCode }}</td>
                    <td>{{ employee.employeementType }}</td>
                    <td>{{ employee.first_name }}</td>
                    <td>{{ employee.last_name }}</td>
                    <td>{{ employee.department }}</td>
                    <td>{{ employee.designation }}</td>
                    <td class="text-center" style="vertical-align: middle;">
                        <button pButton type="button" icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-sm mr-1" (click)="editEmployee(employee.userID)">Edit</button>
                    </td>
                </tr>
            </ng-template>
            <ng-template #emptymessage>
                <tr>
                    <td colspan="13">No admin found.</td>
                </tr>
            </ng-template>
            <ng-template #loadingbody>
                <tr>
                    <td colspan="13">Loading admin data. Please wait.</td>
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
    `
})
export class AdminTable implements OnInit {
    employees: Employee[] = [];
    selectedEmployees: Employee[] = [];
    loading: boolean = true;
    selectAllChecked: boolean = false;

    constructor(
        private adminService: AdminService,
        private router: Router
    ) {}

    ngOnInit() {
        this.adminService.getAdmines().subscribe((response) => {
            const employeesData = response.ml_UserDetail || [];
            this.employees = employeesData.map((emp: any) => ({
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

    newAdmin() {
        this.router.navigate(['/admin/admin-new']);
    }

    editEmployee(userID: number) {
        this.router.navigate(['/admin/admin-edit'], { queryParams: { id: userID } });
    }

    deleteEmployee(employee: Employee) {
        // Implement deletion logic as needed
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

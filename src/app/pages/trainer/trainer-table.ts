import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TrainerService } from '@/layout/service/trainer.service';
import { UserService } from '@/layout/service/user.service';

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
    selector: 'app-trainer-table',
    standalone: true,
    imports: [
        TableModule,
        InputTextModule,
        CommonModule,
        FormsModule,
        ButtonModule
    ],
    template: `
        <div class="card">            
            <p-table
                #dt1
                [value]="employees"
                dataKey="userID"
                [rows]="3"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                responsiveLayout="scroll"
                [globalFilterFields]="['employeeCode', 'employeementType', 'first_name', 'last_name', 'department', 'designation']"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-col sm:flex-row w-full">
                        <div class="mb-3 flex gap-2">
                            <span class="text-xl font-semibold">Trainer List</span>
                        </div>
                        <div class="flex gap-2 ml-auto">
                            <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" placeholder="Search keyword" />
                        </div>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th>Trainer ID</th>
                        <th>Employment Type</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Action</th>                        
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
                            <button 
                                pButton 
                                type="button" 
                                icon="pi pi-pencil" 
                                class="p-button-rounded p-button-text p-button-sm mr-1"
                                (click)="editTrainer(employee.userID)">
                                Edit
                            </button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="7">No trainers found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="7">Loading trainers data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <div class="card">            
            <p-table
                #dt2
                [value]="users"
                dataKey="userID"
                [rows]="3"
                [loading]="loading"
                [rowHover]="true"
                [showGridlines]="true"
                [paginator]="true"
                responsiveLayout="scroll"
                [globalFilterFields]="['employeeCode', 'employeementType', 'first_name', 'last_name', 'department', 'designation']"
            >
                <ng-template #caption>
                    <div class="flex justify-between items-center flex-col sm:flex-row w-full">
                        <div class="mb-3 flex gap-2">
                            <span class="text-xl font-semibold">User List</span>
                        </div>      
                        <div class="flex gap-2 ml-auto">
                            <input pInputText type="text" (input)="onGlobalFilter(dt2, $event)" placeholder="Search keyword" />
                        </div>                  
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th>User ID</th>
                        <th>Employment Type</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th> 
                        <th>Designation</th>
                        <th>Action</th>                          
                    </tr>
                </ng-template>
                <ng-template #body let-users>
                    <tr>                     
                        <td>{{ users.employeeCode }}</td>
                        <td>{{ users.employeementType }}</td>
                        <td>{{ users.first_name }}</td>
                        <td>{{ users.last_name }}</td>
                        <td>{{ users.department }}</td>
                        <td>{{ users.designation }}</td>                        
                        <td class="text-center" style="vertical-align: middle;">
                            <button
                                pButton
                                type="button"
                                label="Add to Trainer"
                                class="p-button-success p-button-sm"
                                (click)="addToTrainer(users)"
                            ></button>
                        </td>
                    </tr>
                </ng-template>
                <ng-template #emptymessage>
                    <tr>
                        <td colspan="7">No Users found.</td>
                    </tr>
                </ng-template>
                <ng-template #loadingbody>
                    <tr>
                        <td colspan="7">Loading Users data. Please wait.</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>`,
    providers: [MessageService]
})
export class TrainerTable implements OnInit {
    employees: Employee[] = [];
    users: Users[] = [];
    loading: boolean = true;

    constructor(
        private trainerService: TrainerService,
        private userService: UserService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.router = inject(Router);
    }

    ngOnInit() {
        this.fetchAllData();
    }

    fetchAllData() {
        this.loading = true;
        this.trainerService.getTrainers().subscribe((response) => {
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
        this.userService.getUsers().subscribe((response) => {
            const userData = response.ml_UserDetail || [];
            this.users = userData.map((emp: any) => ({
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

    addToTrainer(user: Users) {
        const userDBConnStr = "string";
        this.trainerService.putAssignRole(
            user.userID,
            2,         
            'Trainer',  
            userDBConnStr
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role Assigned',
                    detail: `${user.first_name} ${user.last_name} promoted to Trainer`
                });
                this.fetchAllData();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: `Failed to assign Trainer role to ${user.first_name} ${user.last_name}`
                });
            }
        });
    }

    editTrainer(userID: number) {
        this.router.navigate(['/trainer/trainer-edit'], { queryParams: { id: userID } });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
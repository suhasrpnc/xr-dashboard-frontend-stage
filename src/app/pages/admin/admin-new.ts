import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterService } from '@/layout/service/master.service';
import { AdminService } from '@/layout/service/admin.service';

@Component({
    selector: 'app-new-admin',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        SelectModule,
        DatePickerModule
    ],
    template: `
      <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <form class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" (ngSubmit)="onSubmit()" #employeeForm="ngForm" novalidate>
          <div class="flex flex-col gap-1">
            <label for="employmentType" class="font-medium text-gray-800">Employment Type <span class="text-red-500">*</span></label>
            <p-select 
              id="employmentType"
              name="EmploymentType"
              [options]="employmentTypes"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="formData.EmploymentType"
              placeholder="Select Employment Type"
              class="w-full"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.EmploymentType" class="text-red-500 text-xs">Employment Type is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="contractorname" class="font-medium text-gray-800">Contractor Name<span *ngIf="formData.EmploymentType === 'contractor'" class="text-red-500">*</span></label>
            <p-select 
              id="contractorname" 
              name="ContractorID"
              [options]="contract"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.ContractorID"
              placeholder="Select Contractor"
              class="w-full"
              [disabled]="formData.EmploymentType === 'payroll'"
              (onChange)="setContractorName($event.value)">
            </p-select>
            <div *ngIf="formSubmitted && formData.EmploymentType === 'contractor' && !formData.ContractorID" class="text-red-500 text-xs">Contractor Name is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="branch" class="font-medium text-gray-800">Branch <span class="text-red-500">*</span></label>
            <p-select 
              id="branch" 
              name="BranchID"
              [options]="branch"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.BranchID"
              placeholder="Select Branch"
              class="w-full"
              (onChange)="setBranchName($event.value)">
            </p-select>
            <div *ngIf="formSubmitted && !formData.BranchID" class="text-red-500 text-xs">Branch is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="language" class="font-medium text-gray-800">Language <span class="text-red-500">*</span></label>
            <p-select
              id="language"
              name="LanguageID"
              [options]="language"
              optionLabel="name"
              optionValue="id"
              [(ngModel)]="formData.LanguageID"
              placeholder="Select Language"
              class="w-full"
              (onChange)="setLanguageName($event.value)">
            </p-select>
            <div *ngIf="formSubmitted && !formData.LanguageID" class="text-red-500 text-xs">Language is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="firstName" class="font-medium text-gray-800">First Name <span class="text-red-500">*</span></label>
            <input pInputText id="firstName" type="text" name="FirstName" [(ngModel)]="formData.FirstName" class="w-full" required />
            <div *ngIf="formSubmitted && !formData.FirstName" class="text-red-500 text-xs">First Name is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="lastName" class="font-medium text-gray-800">Last Name <span class="text-red-500">*</span></label>
            <input pInputText id="lastName" type="text" name="LastName" [(ngModel)]="formData.LastName" class="w-full" required />
            <div *ngIf="formSubmitted && !formData.LastName" class="text-red-500 text-xs">Last Name is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="gender" class="font-medium text-gray-800">Gender <span class="text-red-500">*</span></label>
            <p-select
              id="gender"
              name="Gender"
              [options]="genders"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="formData.Gender"
              placeholder="Select Gender"
              class="w-full"
              required>
            </p-select>
            <div *ngIf="formSubmitted && !formData.Gender" class="text-red-500 text-xs">Gender is required.</div>
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="dateOfBirth" class="font-medium text-gray-800">Date of Birth <span class="text-red-500">*</span></label>
            <p-datepicker
              id="dateOfBirth"
              name="DateOfBirth"
              inputId="dateOfBirth"
              [(ngModel)]="formData.DateOfBirth"
              [showIcon]="true"
              [dateFormat]="'mm/dd/yy'"
              [class]="'w-full'"
              [style]="{'width':'100%'}"
              [inputStyle]="{'width':'100%'}"
              placeholder="Select Date of Birth"
              required>
            </p-datepicker>
            <div *ngIf="formSubmitted && !formData.DateOfBirth" class="text-red-500 text-xs">Date of Birth is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="email" class="font-medium text-gray-800">Email <span class="text-red-500">*</span></label>
            <input pInputText id="email" type="text" name="Email" [(ngModel)]="formData.Email" class="w-full" />
            <div *ngIf="formSubmitted && !formData.Email" class="text-red-500 text-xs">Email is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="phonenumber" class="font-medium text-gray-800">Phone Number <span class="text-red-500">*</span></label>
            <input
              pInputText
              id="phonenumber"
              type="tel"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="10"
              name="PhoneNumber"
              [(ngModel)]="formData.PhoneNumber"
              class="w-full"
              placeholder="Enter 10-digit Phone Number"
              (input)="onPhoneInput($event)"
              required
            />
            <div *ngIf="formSubmitted && !formData.PhoneNumber" class="text-red-500 text-xs">Phone Number is required.</div>
            <div *ngIf="formSubmitted && formData.PhoneNumber && formData.PhoneNumber.length !== 10" class="text-red-500 text-xs">Phone Number must be exactly 10 digits.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="designation" class="font-medium text-gray-800">Designation <span class="text-red-500">*</span></label>
            <p-select id="designation" name="DesignationID" [options]="designations" optionLabel="name" optionValue="id" [(ngModel)]="formData.DesignationID" placeholder="Select Designation" class="w-full" required (onChange)="setDesignationName($event.value)"></p-select>
            <div *ngIf="formSubmitted && !formData.DesignationID" class="text-red-500 text-xs">Designation is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="departmentId" class="font-medium text-gray-800">Department <span class="text-red-500">*</span></label>
            <p-select id="departmentId" name="DepartmentID" [options]="departments" optionLabel="name" optionValue="id" [(ngModel)]="formData.DepartmentID" placeholder="Select Department" class="w-full" required (onChange)="setDepartmentName($event.value)"></p-select>
            <div *ngIf="formSubmitted && !formData.DepartmentID" class="text-red-500 text-xs">Department is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="employmentnumber" class="font-medium text-gray-800">Admin ID <span class="text-red-500">*</span></label>
            <input pInputText id="employmentnumber" type="text" name="EmploymentNumber" [(ngModel)]="formData.EmploymentNumber" class="w-full" required />
            <div *ngIf="formSubmitted && !formData.EmploymentNumber" class="text-red-500 text-xs">Admin ID is required.</div>
          </div>
          <div class="flex flex-col gap-1">
            <label for="aadhaarNumber" class="font-medium text-gray-800">Aadhaar Number <span class="text-red-500">*</span></label>
            <input 
              pInputText
              id="aadhaarNumber"
              type="tel"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="12"
              name="AadhaarNumber"
              [(ngModel)]="formData.AadhaarNumber"
              class="w-full"
              placeholder="Enter Aadhaar Number"
              (input)="onAadhaarInput($event)"
              required />
            <div *ngIf="formSubmitted && !formData.AadhaarNumber" class="text-red-500 text-xs">Aadhaar Number is required.</div>
          </div>
          <div></div>
          <div></div>
          <div class="col-span-1 sm:col-span-2 lg:col-span-4 rounded-lg">
            <div class="flex flex-col sm:flex-row gap-4 w-full">
              <div class="flex-1 flex flex-col gap-1">
                <label for="address" class="font-medium text-gray-800 w-full">Address</label>
                <input
                  pInputText
                  id="address"
                  type="text"
                  name="Address"
                  [(ngModel)]="formData.Address"
                  class="w-full"
                  placeholder="Enter Address"
                />
              </div>
              <div class="flex flex-col gap-1 w-full sm:w-1/4">
                <label for="postalCode" class="font-medium text-gray-800">Postal Code</label>
                <input pInputText id="postalCode" type="text" name="PostalCode" maxlength="6" pattern="\\d{6}" [(ngModel)]="formData.PostalCode" class="w-full" placeholder="Enter 6-digit Postal Code" (input)="onPostalCodeInput($event)" />
                <div *ngIf="formSubmitted && formData.PostalCode && formData.PostalCode.length !== 6" class="text-red-500 text-xs">Postal Code must be exactly 6 digits.</div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-4 mt-4">              
              <div class="flex-1 flex flex-col gap-1">
                <label for="countryName" class="font-medium text-gray-800">Country</label>
                <p-select
                  id="countryName"
                  name="CountryID"
                  [options]="countries"
                  optionLabel="name"
                  optionValue="id"
                  [(ngModel)]="formData.CountryID"
                  placeholder="Select Country"
                  class="w-full"
                  (onChange)="handleCountryChange($event.value); setCountryName($event.value)"
                ></p-select>
                <div *ngIf="formSubmitted && !formData.CountryID" class="text-red-500 text-xs">Country is required.</div>
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <label for="stateName" class="font-medium text-gray-800">State</label>
                <p-select
                  id="stateName"
                  name="StateID"
                  [options]="states"
                  optionLabel="name"
                  optionValue="id"
                  [(ngModel)]="formData.StateID"
                  placeholder="Select State"
                  class="w-full"
                  (onChange)="handleStateChange($event.value); setStateName($event.value)"
                ></p-select>
                <div *ngIf="formSubmitted && !formData.StateID" class="text-red-500 text-xs">State is required.</div>
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <label for="cityName" class="font-medium text-gray-800">City</label>
                <p-select
                  id="cityName"
                  name="CityID"
                  [options]="cities"
                  optionLabel="name"
                  optionValue="id"
                  [(ngModel)]="formData.CityID"
                  placeholder="Select City"
                  class="w-full"
                  (onChange)="setCityName($event.value)"
                ></p-select>
                <div *ngIf="formSubmitted && !formData.CityID" class="text-red-500 text-xs">City is required.</div>
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <label for="area" class="font-medium text-gray-800">Area</label>
                <input
                  pInputText
                  id="area"
                  type="text"
                  name="Area"
                  [(ngModel)]="formData.Area"
                  class="w-full"
                  placeholder="Enter Area"
                />
              </div>
            </div>
          </div>
        </form>
        <div class="flex justify-end gap-3 mt-8">
        <button pButton type="button" label="Cancel" icon="pi pi-times" class="p-button-danger" (click)="cancel()"></button>
        <button pButton type="submit" label="Save" icon="pi pi-save" class="p-button-success" (click)="onSubmit()"></button>
        </div>
      </div>
    `
})
export class NewAdmin implements OnInit {
    formSubmitted: boolean = false;
    formData: any = {
        EmploymentType: null,
        EmploymentNumber: '',
        ContractorID: null, 
        ContractorName: '',
        Email: '',
        FirstName: '',
        LastName: '',
        Gender: null,
        DateOfBirth: null,
        DesignationID: null,
        DesignationName: '',
        DepartmentID: null,
        DepartmentName: '',
        BranchID: null, 
        BranchName: '',
        PhoneNumber: '',
        AadhaarNumber: '',
        LanguageID: null,
        LanguageName: '',
        PostalCode: '',
        Address: '',
        Area: '',
        CountryID: null,
        CountryName: '',
        StateID: null,
        StateName: '',
        CityID: null,
        CityName: '',
    };

    employmentTypes: any[] = [
        { value: 'payroll', label: 'Payroll' },
        { value: 'contractor', label: 'Contractor' }
    ];
    genders: any[] = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];
    states: any[] = [];
    cities: any[] = [];
    countries: any[] = [];
    departments: any[] = [];
    designations: any[] = [];
    branch: any[] = [];
    contract: any[] = [];
    language: any[] = [];

    constructor(
        private adminService: AdminService,
        private masterService: MasterService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadMasterData();
    }

    loadMasterData() {
        this.masterService.get_MDForUser().subscribe({
            next: (data) => {
                if (Array.isArray(data.ml_LocationCountry)) {
                    this.countries = data.ml_LocationCountry;
                }
                if (Array.isArray(data.ml_OrganizationDepartment)) {
                    this.departments = data.ml_OrganizationDepartment;
                }
                if (Array.isArray(data.ml_OrganizationDesignation)) {
                    this.designations = data.ml_OrganizationDesignation;
                } 
                if (Array.isArray(data.ml_OrganizationContract)) {
                    this.contract = data.ml_OrganizationContract;
                }
                if (Array.isArray(data.ml_OrganizationBranch)) {
                    this.branch = data.ml_OrganizationBranch;
                } 
                if (Array.isArray(data.ml_OrganizationLanguage)) {
                    this.language = data.ml_OrganizationLanguage;
                }
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load master data for employee form'
                });
            }
        });
    }

    handleCountryChange(countryId: number) {
        if (!countryId) {
            this.states = [];
            this.cities = [];
            this.formData.StateID = null;
            this.formData.StateName = '';
            this.formData.CityID = null;
            this.formData.CityName = '';
            return;
        }
        this.masterService.get_LocationState(countryId).subscribe({
            next: (data) => {
                if (Array.isArray(data.ml_LocationState)) {
                    this.states = data.ml_LocationState;
                } else {
                    this.states = [];
                }
                if (!this.states.find(state => state.id === this.formData.StateID)) {
                    this.formData.StateID = null;
                    this.formData.StateName = '';
                }
                this.cities = [];
                this.formData.CityID = null;
                this.formData.CityName = '';
            },
            error: () => {
                this.states = [];
                this.cities = [];
                this.formData.StateID = null;
                this.formData.StateName = '';
                this.formData.CityID = null;
                this.formData.CityName = '';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load states for selected country'
                });
            }
        });
    }

    handleStateChange(stateId: number) {
        const countryId = this.formData.CountryID;
        this.formData.StateID = stateId;
        if (!countryId || !stateId) {
            this.cities = [];
            this.formData.CityID = null;
            this.formData.CityName = '';
            return;
        }
        this.masterService.get_LocationCity(countryId, stateId).subscribe({
            next: (data) => {
                if (Array.isArray(data.ml_LocationCity)) {
                    this.cities = data.ml_LocationCity;
                } else {
                    this.cities = [];
                }
                if (!this.cities.find(city => city.id === this.formData.CityID)) {
                    this.formData.CityID = null;
                    this.formData.CityName = '';
                }
            },
            error: () => {
                this.cities = [];
                this.formData.CityID = null;
                this.formData.CityName = '';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load cities for selected state'
                });
            }
        });
    }

    setDesignationName(designationId: number) {
        const obj = this.designations.find(d => d.id === designationId);
        this.formData.DesignationID = designationId;
        this.formData.DesignationName = obj ? obj.name : '';
    }

    setDepartmentName(departmentId: number) {
        const obj = this.departments.find(d => d.id === departmentId);
        this.formData.DepartmentID = departmentId;
        this.formData.DepartmentName = obj ? obj.name : '';
    }

    setLanguageName(languageId: number) {
        const obj = this.language.find(l => l.id === languageId);
        this.formData.LanguageID = languageId;
        this.formData.LanguageName = obj ? obj.name : '';
    }

    setCountryName(countryId: number) {
        const obj = this.countries.find(c => c.id === countryId);
        this.formData.CountryID = countryId;
        this.formData.CountryName = obj ? obj.name : '';
    }

    setStateName(stateId: number) {
        const obj = this.states.find(s => s.id === stateId);
        this.formData.StateID = stateId;
        this.formData.StateName = obj ? obj.name : '';
    }

    setCityName(cityId: number) {
        const obj = this.cities.find(c => c.id === cityId);
        this.formData.CityID = cityId;
        this.formData.CityName = obj ? obj.name : '';
    }

    setContractorName(contractorId: number) {
        const obj = this.contract.find(c => c.id === contractorId);
        this.formData.ContractorID = contractorId;
        this.formData.ContractorName = obj ? obj.name : '';
    }

    setBranchName(branchId: number) {
        const obj = this.branch.find(b => b.id === branchId);
        this.formData.BranchID = branchId;
        this.formData.BranchName = obj ? obj.name : '';
    }


    onPostalCodeInput(event: any) {
      const originalValue: string = event?.target?.value ?? '';
      const digitsOnly = originalValue.replace(/\D+/g, '').slice(0, 6);
      event.target.value = digitsOnly;
      this.formData.PostalCode = digitsOnly;
    }

    cancel() {
        this.router.navigate(['/admin/admintable']);
    }

    onSubmit() {
        this.formSubmitted = true;

        const mandatoryFields = [
            'EmploymentType', 'EmploymentNumber', 'FirstName', 'LastName', 'Gender', 'DateOfBirth',
            'DesignationID', 'DepartmentID', 'BranchID', 'LanguageID', 'CountryID', 'StateID', 'CityID',
            'Email', 'PhoneNumber', 'AadhaarNumber'
        ];

        let hasError = false;

        for (const field of mandatoryFields) {
            if (
                this.formData[field] === null ||
                this.formData[field] === '' ||
                this.formData[field] === undefined
            ) {
                hasError = true;
            }
        }

        if (
            this.formData.EmploymentType === 'contractor' &&
            (this.formData.ContractorID === null ||
            this.formData.ContractorID === '' ||
            this.formData.ContractorID === undefined)
        ) {
            hasError = true;
        }

        if (this.formData.PhoneNumber && String(this.formData.PhoneNumber).length !== 10) {
            hasError = true;
        }

        if (this.formData.PostalCode && (
                String(this.formData.PostalCode).length !== 6 ||
                !/^[0-9]{6}$/.test(this.formData.PostalCode)
            )) {
            hasError = true;
        }

        if (hasError) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Please fill all mandatory fields before submitting the form.'
            });
            return;
        }

        // Format DateOfBirth to ISO string format for the API (using UTC to avoid timezone issues)
        let dateOfBirthToSend = this.formData.DateOfBirth;
        if (this.formData.DateOfBirth instanceof Date) {
            const d = this.formData.DateOfBirth;
            // Use UTC to preserve the selected date without timezone conversion
            dateOfBirthToSend = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
        } else if (typeof this.formData.DateOfBirth === 'string') {
            const d = new Date(this.formData.DateOfBirth);
            if (!isNaN(d.getTime())) {
                dateOfBirthToSend = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
            }
        }

        const payload = {
            employmentType: this.formData.EmploymentType,
            employmentNumber: this.formData.EmploymentNumber,
            contractorId: this.formData.ContractorID,
            contractorName: this.formData.ContractorName,
            email: this.formData.Email,
            firstName: this.formData.FirstName,
            lastName: this.formData.LastName,
            gender: this.formData.Gender,
            dateOfBirth: dateOfBirthToSend,
            designationId: this.formData.DesignationID,
            designationName: this.formData.DesignationName,
            departmentId: this.formData.DepartmentID,
            departmentName: this.formData.DepartmentName,
            branchId: this.formData.BranchID,
            branchName: this.formData.BranchName,
            phoneNumber: this.formData.PhoneNumber,
            aadhaarNumber: this.formData.AadhaarNumber,
            languageId: this.formData.LanguageID,
            languageName: this.formData.LanguageName,
            postalCode: this.formData.PostalCode,
            address: this.formData.Address,
            area: this.formData.Area,
            countryId: this.formData.CountryID,
            countryName: this.formData.CountryName,
            stateId: this.formData.StateID,
            stateName: this.formData.StateName,
            cityId: this.formData.CityID,
            cityName: this.formData.CityName
        };

        this.adminService.putUserNew(payload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Admin added successfully'
                });
                this.router.navigate(['/admin/admintable']);
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Admin could not be added'
                });
            }
        });
    }

    onPhoneInput(event: any) {
        const originalValue: string = event?.target?.value ?? '';
        const digitsOnly = originalValue.replace(/\D+/g, '').slice(0, 10);
        event.target.value = digitsOnly;
        this.formData.PhoneNumber = digitsOnly;
    }

    onAadhaarInput(event: any) {
        const originalValue: string = event?.target?.value ?? '';
        const digitsOnly = originalValue.replace(/\D+/g, '').slice(0, 12);
        event.target.value = digitsOnly;
        this.formData.AadhaarNumber = digitsOnly;
    }
}
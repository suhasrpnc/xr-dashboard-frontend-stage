import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FluidModule } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputOtpModule } from 'primeng/inputotp';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MasterService } from '@/layout/service/master.service';
import { TrainerService } from '@/layout/service/trainer.service';

@Component({
    selector: 'app-new-trainer',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        SelectButtonModule,
        InputGroupModule,
        FluidModule,
        IconFieldModule,
        InputIconModule,
        FloatLabelModule,
        InputNumberModule,
        SliderModule,
        RatingModule,
        ColorPickerModule,
        KnobModule,
        SelectModule,
        DatePickerModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,
        MultiSelectModule,
        ListboxModule,
        InputGroupAddonModule,
        TextareaModule,
        IftaLabelModule,
        InputOtpModule
    ],
    template: `
      <div class="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <form class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" (ngSubmit)="onSubmit()" #employeeForm="ngForm">
        <div class="flex flex-col gap-1">
            <label for="employmentType" class="font-medium text-gray-800">Employment Type</label>
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
          </div>
          <div class="flex flex-col gap-1">
            <label for="contractorname" class="font-medium text-gray-800">Contractor Name</label>
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
          </div>
          <div class="flex flex-col gap-1">
            <label for="branch" class="font-medium text-gray-800">Branch</label>
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
          </div>
          <div class="flex flex-col gap-1">
            <label for="language" class="font-medium text-gray-800">Language</label>
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
          </div>
          <div class="flex flex-col gap-1">
            <label for="firstName" class="font-medium text-gray-800">First Name</label>
            <input pInputText id="firstName" type="text" name="FirstName" [(ngModel)]="formData.FirstName" class="w-full" required />
          </div>
          <div class="flex flex-col gap-1">
            <label for="lastName" class="font-medium text-gray-800">Last Name</label>
            <input pInputText id="lastName" type="text" name="LastName" [(ngModel)]="formData.LastName" class="w-full" required />
          </div>
          <div class="flex flex-col gap-1">
            <label for="gender" class="font-medium text-gray-800">Gender</label>
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
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label for="dateOfBirth" class="font-medium text-gray-800">Date of Birth</label>
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
          </div>
          <div class="flex flex-col gap-1">
            <label for="email" class="font-medium text-gray-800">Email</label>
            <input pInputText id="email" type="text" name="Email" [(ngModel)]="formData.Email" class="w-full" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="phonenumber" class="font-medium text-gray-800">Phone Number</label>
            <input pInputText id="phonenumber" type="text" name="PhoneNumber" [(ngModel)]="formData.PhoneNumber" class="w-full" placeholder="Enter Phone Number" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="designation" class="font-medium text-gray-800">Designation</label>
            <p-select id="designation" name="DesignationID" [options]="designations" optionLabel="name" optionValue="id" [(ngModel)]="formData.DesignationID" placeholder="Select Designation" class="w-full" required (onChange)="setDesignationName($event.value)"></p-select>
          </div>
          <div class="flex flex-col gap-1">
            <label for="departmentId" class="font-medium text-gray-800">Department</label>
            <p-select id="departmentId" name="DepartmentID" [options]="departments" optionLabel="name" optionValue="id" [(ngModel)]="formData.DepartmentID" placeholder="Select Department" class="w-full" required (onChange)="setDepartmentName($event.value)"></p-select>
          </div>
          <div class="flex flex-col gap-1">
            <label for="employmentnumber" class="font-medium text-gray-800">Trainer ID</label>
            <input pInputText id="employmentnumber" type="text" name="EmploymentNumber" [(ngModel)]="formData.EmploymentNumber" class="w-full" required />
          </div>
          <div class="flex flex-col gap-1">
            <label for="aadhaarNumber" class="font-medium text-gray-800">Aadhaar Number</label>
            <input pInputText id="aadhaarNumber" type="text" name="AadhaarNumber" [(ngModel)]="formData.AadhaarNumber" class="w-full" placeholder="Enter Aadhaar Number" maxlength="12" />
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
                <input pInputText id="postalCode" type="text" name="PostalCode" [(ngModel)]="formData.PostalCode" class="w-full" placeholder="Enter Postal Code" />
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
            <button pButton type="button" label="Cancel" class="p-button-outlined p-button-danger" (click)="cancel()"></button>
            <button pButton type="submit" label="Save" class="p-button-success" form="ngForm" (click)="onSubmit()"></button>
        </div>
      </div>
    `
})
export class NewTrainer implements OnInit {
    showPassword: boolean = false;
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
        private trainerService: TrainerService,
        private masterService: MasterService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.router = inject(Router);
    }

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
            error: (err) => {
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
            error: (err) => {
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
            error: (err) => {
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

    cancel() {
        this.router.navigate(['/trainer/trainertable']);
    }

    onSubmit() {
        const payload = {
            employmentType: this.formData.EmploymentType,
            employmentNumber: this.formData.EmploymentNumber,
            contractorId: this.formData.ContractorID,
            contractorName: this.formData.ContractorName,
            email: this.formData.Email,
            firstName: this.formData.FirstName,
            lastName: this.formData.LastName,
            gender: this.formData.Gender,
            dateOfBirth: this.formData.DateOfBirth,
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

        this.trainerService.addEmployee(payload).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Trainer added successfully'
                });
                this.router.navigate(['/trainer/trainertable']);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Trainer could not be added'
                });
            }
        });
    }
}
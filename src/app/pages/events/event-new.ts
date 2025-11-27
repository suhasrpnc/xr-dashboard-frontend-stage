import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EventService } from '../../layout/service/event.service';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MessageService } from 'primeng/api';
import { UserService } from '@/layout/service/user.service';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'app-new-event',
    standalone: true,
    imports: [CommonModule, TextareaModule, SelectModule, FluidModule, FormsModule, InputTextModule, DropdownModule, CalendarModule, MultiSelectModule, InputSwitchModule, ButtonModule, DividerModule, IconFieldModule, InputIconModule],
    template: `
        <p-fluid>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="card flex flex-col gap-4 w-full">
                    <div class="font-bold text-gray-900 text-xl">New Event</div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <div *ngIf="formSubmitted && !event.title" class="text-red-500 text-xs mb-1">Title is required.</div>
                            <input pInputText [(ngModel)]="event.title" placeholder="Add a title" class="w-full" required />
                        </div>
                        <div class="flex flex-wrap gap-2 w-80">
                            <div *ngIf="formSubmitted && !event.category" class="text-red-500 text-xs mb-1">Category is required.</div>
                            <p-dropdown [options]="categories" optionLabel="label" optionValue="value" [(ngModel)]="event.category" placeholder="Select Category" styleClass="w-full" required></p-dropdown>
                        </div>
                    </div>

                    <div class="flex flex-wrap">
                        <div *ngIf="formSubmitted && !event.description" class="text-red-500 text-xs mt-1">Description is required.</div>
                        <textarea pInputTextarea [(ngModel)]="event.description" placeholder="Add a description" rows="4" class="w-full" required></textarea>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap items-center gap-2">
                            <div *ngIf="formSubmitted && !event.startDate" class="text-red-500 text-xs">Date is required.</div>
                            <i class="pi pi-calendar-plus icon"></i>
                            <p-calendar [(ngModel)]="event.startDate" dateFormat="mm/dd/yy" required></p-calendar>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 ">
                            <div *ngIf="formSubmitted && (!event.startTime || !event.endTime)" class="text-red-500 text-xs mt-1">Start and End time are required.</div>
                            <i class="pi pi-clock icon"></i>
                            <p-dropdown [options]="timeOptions" [(ngModel)]="event.startTime" (onChange)="onStartTimeChange()" required></p-dropdown>
                            <span>to</span>
                            <p-dropdown [options]="timeOptions" [(ngModel)]="event.endTime" required></p-dropdown>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-col w-full gap-2">
                            <span *ngIf="formSubmitted && (!event.attendees || event.attendees.length === 0)" class="text-red-500 text-xs"> Please invite at least one attendee. </span>

                            <div class="flex items-center gap-2 w-full">
                                <i class="pi pi-user-plus icon"></i>
                                <p-multiselect [options]="attendeesList" [(ngModel)]="event.attendees" optionLabel="label" optionValue="value" display="chip" placeholder="Invite attendees" class="w-full" [filter]="true" required>
                                    <ng-template let-user pTemplate="item">
                                        <div class="flex items-center">
                                            <span class="mr-2 pi pi-user"></span>
                                            {{ user.label }}
                                        </div>
                                    </ng-template>
                                </p-multiselect>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end flex-col md:flex-row gap-4">
                        <div class="flex justify-end gap-3 mt-8">
                            <button pButton type="button" label="Cancel" icon="pi pi-times" class="p-button-danger" (click)="discard()"></button>
                            <button pButton type="submit" label="Save" icon="pi pi-save" class="p-button-success" form="deptForm" (click)="saveEvent()"></button>
                        </div>
                    </div>
                </div>
            </div>
        </p-fluid>
    `,

    providers: [EventService]
})
export class NewEvent implements OnInit {
    formSubmitted = false;
    event = {
        title: '',
        category: '',
        attendees: [] as any[],
        description: '',
        startDate: new Date(),
        startTime: { hours: 0, minutes: 0, seconds: 0 },
        endDate: new Date(),
        endTime: { hours: 0, minutes: 0, seconds: 0 }
    };

    timeOptions: any[] = [];
    categories = [
        { label: 'Meeting', value: 'Meeting' },
        { label: 'Training Session', value: 'Training Session' },
        { label: 'Workshop', value: 'Workshop' },
        { label: 'Product Demonstration', value: 'Product Demonstration' },
        { label: 'Certification Assessment', value: 'Certification Assessment' }
    ];
    attendeesList: any[] = [];
    dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    dropdownItem = null;
    private eventService = inject(EventService);
    private userService = inject(UserService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    ngOnInit(): void {
        this.generateTimeOptions();
        this.setDefaultTimes();
        this.getAllUsers();
    }
    private generateTimeOptions() {
        const fullList: any[] = [];
        for (let h = 0; h < 24; h++) {
            for (let m of [0, 30]) {
                fullList.push({
                    label: this.format12Hour(h, m),
                    value: { hours: h, minutes: m, seconds: 0 }
                });
            }
        }
        const now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes() < 30 ? 30 : 0;

        if (now.getMinutes() >= 30) hour++;
        const idx = fullList.findIndex((t) => t.value.hours === hour && t.value.minutes === minute);

        if (idx === -1) {
            this.timeOptions = fullList;
            return;
        }
        const after = fullList.slice(idx);
        const before = fullList.slice(0, idx);
        this.timeOptions = [...after, ...before];
    }
    private format12Hour(hours: number, minutes: number): string {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    private setDefaultTimes() {
        const now = new Date();
        const minutes = now.getMinutes();
        let roundedMinutes = minutes < 30 ? 30 : 0;
        if (minutes >= 30) now.setHours(now.getHours() + 1);

        const start = new Date(now.setMinutes(roundedMinutes, 0, 0));
        const end = new Date(start.getTime() + 30 * 60000);

        this.event.startTime = this.findClosestTimeOption(start);
        this.event.endTime = this.findClosestTimeOption(end);
    }

    private findClosestTimeOption(time: Date) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return this.timeOptions.find((t) => t.value.hours === hours && t.value.minutes === minutes)?.value || { hours, minutes, seconds: 0 };
    }
    onStartTimeChange() {
        debugger;
        if (!this.event.startTime) return;

        const start = new Date();
        start.setHours(this.event.startTime.hours, this.event.startTime.minutes, 0, 0);

        const end = new Date(start.getTime() + 30 * 60000); // add 30 min
        this.event.endTime = this.findClosestTimeOption(end);
    }
    getAllUsers() {
        this.userService.getAllUser().subscribe(
            (response) => {
                const users = Array.isArray(response?.ml_User) ? response.ml_User : response;
                this.attendeesList = users.map((user: any) => ({
                    label: user.firstName + ' ' + user.lastName,
                    value: user.userID,
                    designation: user.designation || '',
                    organization: user.organization || '',
                    email: user.email || '',
                    phone: user.phonePrimary || user.phoneNumber || ''
                }));
                console.log('Attendees list:', this.attendeesList);
            },
            (error) => {
                console.error('Error fetching users:', error);
            }
        );
    }

    private toTimeSpanString(timeObj: any): string {
        // Converts { hours, minutes, seconds } to "HH:MM:SS"
        if (typeof timeObj === 'object' && typeof timeObj.hours === 'number' && typeof timeObj.minutes === 'number' && typeof timeObj.seconds === 'number') {
            // Always zero-pad
            const pad = (n: number) => n.toString().padStart(2, '0');
            return `${pad(timeObj.hours)}:${pad(timeObj.minutes)}:${pad(timeObj.seconds)}`;
        }
        return '00:00:00';
    }

    private formatDateForPayload(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${year}-${pad(month)}-${pad(day)}T00:00:00.000Z`;
    }

    saveEvent() {
        this.formSubmitted = true;
        const formattedDate = this.event.startDate ? this.formatDateForPayload(new Date(this.event.startDate)) : this.formatDateForPayload(new Date());
        if (!this.event.title || !this.event.category || !this.event.description || !this.event.startDate || !this.event.startTime || !this.event.endTime || !this.event.attendees?.length) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Please fill all mandatory fields before saving.'
            });
            return;
        }
        const eventForSubmit = {
            ...this.event,
            eventDate: formattedDate,
            startTime: this.toTimeSpanString(this.event.startTime),
            endTime: this.toTimeSpanString(this.event.endTime)
        };
        const participants = (this.event.attendees || [])
            .map((userID: number) => {
                const userObj = this.attendeesList.find((u) => u.value === userID);
                if (!userObj) return null;

                return {
                    id: 0,
                    eventID: 0,
                    userID: userID,
                    participantName: userObj.label || '',
                    email: userObj.email || '',
                    phone: userObj.phone || '',
                    designation: userObj.designation || '',
                    organization: userObj.organization || '',
                    isAttended: false,
                    createdUserID: 0,
                    createdDateTime: new Date().toISOString(),
                    updatedUserID: 0,
                    updatedDateTime: new Date().toISOString(),
                    isActive: true
                };
            })
            .filter((p) => p !== null); // Remove any null entries

        this.eventService.put_NewEvent(eventForSubmit, participants).subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Event created successfully!'
                });
                this.router.navigate(['/events/event-component']);
            },
            (err) => {
                let errorMsg = 'Failed to create event.';
                try {
                    if (err && err.error && typeof err.error === 'object' && err.error.errors) {
                        const errors = err.error.errors;
                        errorMsg +=
                            ' ' +
                            Object.keys(errors)
                                .map((key) => `${key}: ${errors[key].join(', ')}`)
                                .join(' | ');
                    }
                } catch {}
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMsg
                });
                console.error('Error creating event:', err);
            }
        );
    }

    discard() {
        this.generateTimeOptions();
        this.setDefaultTimes();
        this.event = {
            title: '',
            category: '',
            attendees: [],
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            startTime: { hours: 0, minutes: 0, seconds: 0 },
            endTime: { hours: 0, minutes: 0, seconds: 0 }
        };
        this.router.navigate(['/events/event-component']);
    }
}

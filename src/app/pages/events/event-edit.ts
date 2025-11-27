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
import { Router, ActivatedRoute } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MessageService } from 'primeng/api';
import { UserService } from '@/layout/service/user.service';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'app-edit-event',
    standalone: true,
    imports: [CommonModule, TextareaModule, SelectModule, FluidModule, FormsModule, InputTextModule, DropdownModule, CalendarModule, MultiSelectModule, InputSwitchModule, ButtonModule, DividerModule, IconFieldModule, InputIconModule],
    template: `
        <p-fluid>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="card flex flex-col gap-4 w-full">
                    <div class="font-bold text-gray-900 text-xl">Edit Event</div>

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
export class EditEvent implements OnInit {
    formSubmitted = false;
    event = {
        id: null as number | null,
        title: '',
        category: '',
        attendees: [] as any[],
        description: '',
        startDate: new Date(),
        startTime: { hours: 0, minutes: 0, seconds: 0 },
        endDate: new Date(),
        endTime: { hours: 0, minutes: 0, seconds: 0 }
    };
    private originalParticipants: any[] = []; // Store original participant data with IDs

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
    private route = inject(ActivatedRoute);

    private eventId: number | null = null;

    ngOnInit(): void {
        this.generateTimeOptions();
        this.getAllUsers();

        // Get event id from route params, if exists
        this.route.paramMap.subscribe((params) => {
            const idParam = params.get('id');
            if (idParam) {
                this.eventId = +idParam;
                this.loadEventById(this.eventId);
            } else {
                // If creating new, just set defaults
                this.setDefaultTimes();
            }
        });
    }

    /** Load event details from API and map to form model */
    private loadEventById(id: number) {
        this.eventService.get_EventByID(id).subscribe(
            (response: any) => {
                // Ensure the response matches the described structure
                const eventObj = response?.m_event;
                const participantsArr = response?.ml_event_participant;
                if (eventObj) {
                    // Map event properties according to the provided API structure
                    this.event.id = eventObj.id ?? null;
                    this.ensureCategoryOption(eventObj.eventCategory);
                    this.event.category = eventObj.eventCategory || '';
                    this.event.title = eventObj.name || '';
                    this.event.description = eventObj.description || '';
                    this.event.startDate = eventObj.eventDate ? new Date(eventObj.eventDate) : new Date();

                    // Times
                    this.event.startTime = this.parseTimeString(eventObj.startTime);
                    this.event.endTime = this.parseTimeString(eventObj.endTime);

                    this.generateTimeOptions();

                    // Now map selected values to reordered list
                    this.event.startTime = this.getTimeOptionValue(this.event.startTime.hours, this.event.startTime.minutes);

                    this.event.endTime = this.getTimeOptionValue(this.event.endTime.hours, this.event.endTime.minutes);
                    // Store original participants with their IDs
                    this.originalParticipants = Array.isArray(participantsArr) ? participantsArr : [];

                    // Map attendees from array of objects to array of userIDs
                    this.event.attendees = Array.isArray(participantsArr) ? participantsArr.map((p: any) => p.userID) : [];
                }
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Loading Error',
                    detail: 'Could not load event details.'
                });
                console.error('Error loading event:', error);
                // Reasonable fallback: set default times for form
                this.setDefaultTimes();
            }
        );
    }

    private ensureCategoryOption(categoryValue: string | undefined) {
        if (!categoryValue) {
            return;
        }
        const exists = this.categories.some((option) => option.value === categoryValue);
        if (!exists) {
            this.categories = [
                ...this.categories,
                {
                    label: categoryValue,
                    value: categoryValue
                }
            ];
        }
    }

    /** Convert time string "HH:MM:SS" to {hours, minutes, seconds} */
    private parseTimeString(timeStr: string): { hours: number; minutes: number; seconds: number } {
        if (!timeStr || typeof timeStr !== 'string') {
            return this.getTimeOptionValue(0, 0);
        }
        const parts = timeStr.split(':').map(Number);
        const hours = parts[0] ?? 0;
        const minutes = parts[1] ?? 0;
        const seconds = parts[2] ?? 0;
        return this.getTimeOptionValue(hours, minutes, seconds);
    }

    private generateTimeOptions() {
        const fullList: any[] = [];

        // 1️⃣ Build full list of all 30-minute slots
        for (let h = 0; h < 24; h++) {
            for (let m of [0, 30]) {
                fullList.push({
                    label: this.format12Hour(h, m),
                    value: { hours: h, minutes: m, seconds: 0 }
                });
            }
        }

        // 2️⃣ Determine current time rounded to next 30-min slot
        const now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes() < 30 ? 30 : 0;

        if (now.getMinutes() >= 30) hour++;

        // 3️⃣ Locate the matching index
        const idx = fullList.findIndex((t) => t.value.hours === hour && t.value.minutes === minute);

        if (idx === -1) {
            this.timeOptions = fullList;
            return;
        }

        // 4️⃣ Move current-time block to the top
        const after = fullList.slice(idx);
        const before = fullList.slice(0, idx);

        this.timeOptions = [...after, ...before];
    }

    /** 🕐 Format hours to 12-hour display */
    private format12Hour(hours: number, minutes: number): string {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${ampm}`;
    }

    /** ⚙️ Auto-set start & end times */
    private setDefaultTimes() {
        const now = new Date();

        // Round UP to next 30-minute slot
        const minutes = now.getMinutes();
        let roundedMinutes = minutes < 30 ? 30 : 0;
        if (minutes >= 30) now.setHours(now.getHours() + 1);

        const start = new Date(now.setMinutes(roundedMinutes, 0, 0));
        const end = new Date(start.getTime() + 30 * 60000);

        this.event.startTime = this.findClosestTimeOption(start);
        this.event.endTime = this.findClosestTimeOption(end);
    }

    /** 🔍 Find closest time in dropdown list */
    private findClosestTimeOption(time: Date) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        return this.getTimeOptionValue(hours, minutes);
    }

    private getTimeOptionValue(hours: number, minutes: number, seconds: number = 0) {
        return this.timeOptions.find((t) => t.value.hours === hours && t.value.minutes === minutes)?.value || { hours, minutes, seconds };
    }
    onStartTimeChange() {
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
                // (If event loaded after users, attendee mapping is correct)
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
        const resolvedEventId = this.eventId ?? this.event.id ?? 0;
        const eventForSubmit = {
            ...this.event,
            id: resolvedEventId,
            eventDate: formattedDate,
            startTime: this.toTimeSpanString(this.event.startTime),
            endTime: this.toTimeSpanString(this.event.endTime)
        };
        const participants = (this.event.attendees || [])
            .map((userID: number) => {
                const userObj = this.attendeesList.find((u) => u.value === userID);
                if (!userObj) return null;

                // Check if this participant already exists (for updates)
                const existingParticipant = this.originalParticipants.find((p: any) => p.userID === userID);

                if (existingParticipant) {
                    // Preserve existing participant data, update eventID and timestamps
                    return {
                        ...existingParticipant,
                        eventID: resolvedEventId,
                        participantName: userObj.label || existingParticipant.participantName || '',
                        email: userObj.email || existingParticipant.email || '',
                        phone: userObj.phone || existingParticipant.phone || '',
                        designation: userObj.designation || existingParticipant.designation || '',
                        organization: userObj.organization || existingParticipant.organization || '',
                        updatedDateTime: new Date().toISOString()
                    };
                } else {
                    // New participant - create with id: 0
                    return {
                        id: 0,
                        eventID: resolvedEventId,
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
                }
            })
            .filter((p) => p !== null); // Remove any null entries

        const save$ = this.eventId ? this.eventService.updateEvent(resolvedEventId, eventForSubmit, participants) : this.eventService.put_NewEvent(eventForSubmit, participants);

        save$.subscribe(
            (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: this.eventId ? 'Event updated successfully!' : 'Event created successfully!'
                });
                this.router.navigate(['/events/event-component']);
            },
            (err) => {
                let errorMsg = this.eventId ? 'Failed to update event.' : 'Failed to create event.';
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
                console.error(this.eventId ? 'Error updating event:' : 'Error creating event:', err);
            }
        );
    }

    discard() {
        this.generateTimeOptions();
        this.setDefaultTimes();
        this.event = {
            id: null,
            title: '',
            category: '',
            attendees: [],
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            startTime: { hours: 0, minutes: 0, seconds: 0 },
            endTime: { hours: 0, minutes: 0, seconds: 0 }
        };
        this.originalParticipants = [];
        this.router.navigate(['/events/event-component']);
    }
}

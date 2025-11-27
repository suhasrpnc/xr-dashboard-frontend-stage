import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../layout/service/event.service';
import { EventModel } from './eventmodel';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-event',
    standalone: true,
    imports: [CommonModule, FullCalendarModule, ToolbarModule, ButtonModule, InputTextModule, DropdownModule, DialogModule, TooltipModule, FormsModule, ConfirmDialogModule],
    template: `
        <div class="p-4 fadein animation-duration-500">
            <p-confirmDialog></p-confirmDialog>
            <!-- Toolbar -->
            <p-toolbar class="mb-4 border-round-xl shadow-3 gradient-toolbar">
                <div class="p-toolbar-group-left flex align-items-center gap-2">
                    
                    <h2 class="m-0 flex items-center gap-2 text-[1.25rem] font-semibold text-indigo-600">
                        <i class="pi pi-calendar text-indigo-500"></i>
                        Training & Learning Events
                    </h2>
                </div>
                <div class="p-toolbar-group-right flex gap-3 align-items-center">
                    <p-inputText placeholder="🔍 Search event..." [(ngModel)]="searchText" styleClass="p-inputtext-sm w-12rem"></p-inputText>
                    <p-dropdown [options]="categories" optionLabel="label" optionValue="value" [(ngModel)]="selectedCategory" placeholder="All Categories" styleClass="p-dropdown-sm w-12rem" (onChange)="onCategoryChange($event)"></p-dropdown>
                    <p-button icon="pi pi-plus" label="New Event" class="p-button-sm p-button-outlined p-button-light" (click)="newEvent()"></p-button>
                </div>
            </p-toolbar>

            <!-- Calendar -->
            <div class="calendar-wrapper surface-card border-round-xl shadow-2 p-4">
                <full-calendar [options]="calendarOptions" style="width: 100%;"></full-calendar>
            </div>

            <p-dialog header="📌 Event Details" [(visible)]="showEventDialog" [modal]="true" [style]="{ width: '400px', borderRadius: '12px' }" [dismissableMask]="true" [baseZIndex]="8000">
                <div class="event-dialog">
                    <!-- Title & Category -->
                    <div class="event-section">
                        <div class="event-row align-items-center">
                            <div class="event-title-group">
                                <i class="pi pi-tag icon"></i>
                                <span class="event-title-text">{{ selectedEvent?.title }}</span>
                            </div>
                            <div class="event-category">
                                <i class="pi pi-folder-open mr-1"></i>
                                <span>{{ selectedEvent?.category }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Date & Time -->
                    <div class="event-section">
                        <div class="event-row align-items-center">
                            <i class="pi pi-calendar icon"></i>
                            <span class="event-date-time-inline">
                                <span class="event-date">
                                    {{ selectedEvent?.start | date: 'EEE, MMM d, y' }}
                                </span>
                                <span class="event-time text-muted">
                                    {{ selectedEvent?.start | date: 'h:mm a' }}
                                    <ng-container *ngIf="selectedEvent?.end"> - {{ selectedEvent?.end | date: 'h:mm a' }} </ng-container>
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="event-section">
                        <div class="event-row align-start">
                            <i class="pi pi-align-left icon"></i>
                            <div class="event-description">
                                {{ selectedEvent?.description }}
                            </div>
                        </div>
                    </div>
                </div>

                <ng-template pTemplate="footer">
                    <div class="dialog-footer">
                        <div class="footer-actions-left">
                            <p-button
                                label="Edit"
                                icon="pi pi-pencil"
                                severity="secondary"
                                class="p-button-rounded"
                                [disabled]="!selectedEvent?.id || !canEditOrDeleteEvent()"
                                (click)="editEvent()"
                                [pTooltip]="!canEditOrDeleteEvent() && selectedEvent ? 'Cannot edit past events or events that have already started' : ''"
                            ></p-button>
                            <p-button
                                label="Delete"
                                icon="pi pi-trash"
                                severity="danger"
                                class="p-button-rounded"
                                [disabled]="!selectedEvent?.id || !canEditOrDeleteEvent()"
                                (click)="confirmDelete()"
                                [pTooltip]="!canEditOrDeleteEvent() && selectedEvent ? 'Cannot delete past events or events that have already started' : ''"
                            ></p-button>
                        </div>
                        <div class="footer-actions-right">
                            <p-button label="Close" class="p-button-rounded p-button-secondary" (click)="showEventDialog = false"></p-button>
                        </div>
                    </div>
                </ng-template>
            </p-dialog>
        </div>
    `,
    styles: [
        `
            /* Toolbar Styling */
            .gradient-toolbar {
                background: linear-gradient(90deg, var(--primary-color) 0%, #5b86e5 100%);
                color: white;
                border: none;
            }

            /* Calendar Styling */
            .calendar-wrapper {
                transition: all 0.3s ease;
            }
            .calendar-wrapper:hover {
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
                transform: translateY(-2px);
            }

            .fc-event {
                border-radius: 8px !important;
                padding: 4px 8px !important;
                font-weight: 500;
                transition: all 0.25s ease-in-out;
            }

            .fc-event:hover {
                transform: scale(1.03);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                cursor: pointer;
            }

            .rounded-dialog ::ng-deep .p-dialog {
                border-radius: 1rem;
                overflow: hidden;
            }

            .fadein {
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Event Dialog Styling */
            .event-dialog {
                font-family: 'Inter', 'Segoe UI', sans-serif;
                color: #371f29;
            }

            .event-section {
                margin-bottom: 1rem;
            }

            .event-row {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .event-row.align-start {
                align-items: flex-start;
            }

            .icon {
                color: #6366f1;
                font-size: 1rem;
                flex-shrink: 0;
                margin-top: 2px;
            }

            .event-title-group {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .event-title-text {
                font-weight: 600;
                color: #1f0250;
            }

            .event-category {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                font-size: 0.9rem;
                color: #4b5563;
            }

            .event-date-time-inline {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                flex-wrap: wrap;
                font-size: 0.92rem;
            }

            .event-date {
                font-weight: 600;
                color: #111827;
            }

            .event-time {
                color: #6b7280;
            }

            .event-description {
                font-size: 0.95rem;
                color: #374151;
                line-height: 1.4;
                margin-top: 2px;
                margin-left: 0rem;
            }

            .dialog-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                gap: 1rem;
            }

            .footer-actions-left,
            .footer-actions-right {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            /* FullCalendar Toolbar Button Styling */
            ::ng-deep .fc .fc-toolbar-chunk .fc-button {
                background-color: #f1f5f9;
                border: 1px solid #cbd5e1;
                color: #334155;
                text-transform: capitalize;
                font-weight: 500;
                border-radius: 0.5rem;
                padding: 0.4rem 0.8rem;
                transition: all 0.3s ease;
            }

            ::ng-deep .fc .fc-toolbar-chunk .fc-button:hover {
                background-color: #3b82f6;
                color: white;
                border-color: #2563eb;
            }

            ::ng-deep .fc .fc-toolbar-chunk .fc-button-active {
                background-color: #2563eb !important;
                color: white !important;
                border-color: #1d4ed8 !important;
            }

            ::ng-deep .fc .fc-today-button {
                background-color: #22c55e !important;
                color: white !important;
                border: none !important;
            }

            ::ng-deep .fc-toolbar-chunk .fc-button {
                background-color: #f0f4ff;
                color: #334155;
                font-weight: 600;
                border-radius: 0.5rem;
                text-transform: capitalize;
                transition: all 0.2s ease-in-out;
            }

            ::ng-deep .fc-toolbar-chunk .fc-button:hover {
                background-color: #e0e7ff;
                color: #1e293b;
            }

            ::ng-deep .fc-toolbar-chunk .fc-button.fc-button-active {
                background-color: #3b82f6;
                color: white;
            }

            /* Days of Week Header Styling */
            ::ng-deep .fc-col-header-cell {
                background-color: #818bd3;
                color: #f5f7fb;
                font-weight: 600;
                text-transform: capitalize;
                border-bottom: 1px solid #e2e8f0;
            }
        `
    ],
    providers: [EventService, ConfirmationService]
})
export class EventComponent implements OnInit {
    events: EventModel[] = [];
    searchText = '';
    showEventDialog = false;
    selectedEvent: EventModel | null = null;

    private router = inject(Router);

    categories = [
        { label: 'All Categories', value: null },
        { label: 'Meeting', value: 'Meeting' },
        { label: 'Training Session', value: 'Training Session' },
        { label: 'Workshop', value: 'Workshop' },
        { label: 'Product Demonstration', value: 'Product Demonstration' },
        { label: 'Certification Assessment', value: 'Certification Assessment' }
    ];
    selectedCategory: string | null = null;
    calendarOptions: any = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],
        eventClick: (info: any) => {
            this.selectedEvent = info.event.extendedProps ? { ...info.event.extendedProps } : info.event;
            this.showEventDialog = true;
        }
    };

    constructor(
        private eventService: EventService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadEvents();
    }

    onCategoryChange(event: any) {
        this.selectedCategory = event.value ?? null;
        this.loadFilteredEvents(this.selectedCategory);
    }
    loadEvents() {
        const result = this.eventService.get_AllEvent();

        // Check if result is Observable or array
        if (Array.isArray(result)) {
            // Direct array case
            this.events = result;
            this.initializeCalendar();
        } else if (result && typeof result.subscribe === 'function') {
            // Observable case
            result.subscribe((data: EventModel[]) => {
                this.events = data;
                this.initializeCalendar();
            });
        }
    }
    loadFilteredEvents(categoryFilter: string | null = null) {
        const result = this.eventService.get_AllEvent();

        if (Array.isArray(result)) {
            this.events = categoryFilter ? result.filter((e) => e.category === categoryFilter) : result;
            this.initializeCalendar();
        } else if (result && typeof result.subscribe === 'function') {
            result.subscribe((data: EventModel[]) => {
                this.events = categoryFilter ? data.filter((e) => e.category === categoryFilter) : data;
                this.initializeCalendar();
            });
        }
    }

    initializeCalendar() {
        // Update the existing calendarOptions with events
        this.calendarOptions = {
            ...this.calendarOptions,
            events: this.events.map((e) => ({
                id: e.id,
                title: e.title,
                start: e.start,
                end: e.end,
                extendedProps: {
                    id: e.id,
                    title: e.title,
                    start: e.start,
                    end: e.end,
                    description: e.description,
                    category: e.category
                }
            }))
        };
    }

    newEvent() {
        // Placeholder for event creation dialog
        this.router.navigate(['/events/event-new']);
    }

    canEditOrDeleteEvent(): boolean {
        if (!this.selectedEvent?.start) {
            return false;
        }

        const now = new Date();
        const eventStart = new Date(this.selectedEvent.start);

        // Compare dates and times
        // If event start is in the future (from now onwards), allow edit/delete
        // If event start is in the past, disable edit/delete
        return eventStart > now;
    }

    editEvent() {
        if (!this.selectedEvent?.id) {
            return;
        }

        if (!this.canEditOrDeleteEvent()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Cannot Edit',
                detail: 'You cannot edit past events or events that have already started.'
            });
            return;
        }

        this.router.navigate(['/events/event-edit', this.selectedEvent.id]);
    }

    confirmDelete() {
        if (!this.selectedEvent?.id) {
            return;
        }

        if (!this.canEditOrDeleteEvent()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Cannot Delete',
                detail: 'You cannot delete past events or events that have already started.'
            });
            return;
        }

        this.confirmationService.confirm({
            message: 'Do you want to delete this event?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
            accept: () => this.deleteSelectedEvent()
        });
    }

    private deleteSelectedEvent() {
        if (!this.selectedEvent?.id) {
            return;
        }

        this.eventService.deleteEvent(Number(this.selectedEvent.id)).subscribe({
            next: () => {
                this.events = this.events.filter((event) => event.id !== this.selectedEvent?.id);
                this.initializeCalendar();
                this.showEventDialog = false;
                this.selectedEvent = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Event successfully deleted.'
                });
            },
            error: () => {
                console.error('Failed to delete event');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete event.'
                });
            }
        });
    }
}

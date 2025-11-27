import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificateService } from '../../layout/service/certificate.service';

@Component({
    selector: 'app-table-demo',
    standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        CommonModule,
        FormsModule
    ],
    template: ` 
        <div class="card">
            <div class="flex flex-column sm:flex-row justify-between align-items-center mb-3 gap-3">
                <div class="flex gap-2 align-items-center ml-auto">
                    <button 
                        pButton 
                        type="button" 
                        label="Add Certificate"
                        class="p-button-primary p-button-sm"
                        style="z-index:10"
                        (click)="addCertificate()"
                    ></button>
                </div>
            </div>
            <p-table [value]="certificatelist" styleClass="mt-4">
                <ng-template pTemplate="header">
                    <tr>
                        <th style="min-width:150px">User Name</th>
                        <th style="min-width:150px">Certificate Name</th>
                        <th style="min-width:200px">Issue Date</th>
                        <th style="min-width:100px">Status</th>
                        <th style="min-width:200px">Certificate URL</th>
                        <th style="min-width:100px">Action</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-certificate>
                    <tr>
                        <td>{{ certificate.userName }}</td>
                        <td>{{ certificate.certificateName }}</td>
                        <td>{{ certificate.issueDate ? (certificate.issueDate | date:'mediumDate') : '-' }}</td>
                        <td>{{ certificate.isRevoked ? 'Revoked' : (certificate.isActive ? 'Active' : 'Inactive') }}</td>
                        <td>
                            <ng-container *ngIf="certificate.certificateURL && certificate.certificateURL !== ''; else defaultCertificate">
                                <a 
                                    [href]="certificate.certificateURL" 
                                    target="_blank" 
                                    class="text-blue-600 underline"
                                >View Certificate</a>
                            </ng-container>
                            <ng-template #defaultCertificate>
                                <a 
                                    href="/templates/CertificateTemplate.pdf" 
                                    target="_blank" 
                                    class="text-blue-600 underline"
                                >View Certificate</a>
                            </ng-template>
                        </td>
                        <td>
                            <!-- Actions will go here in future -->
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    providers: [MessageService]
})
export class CertificateComponent implements OnInit {

    certificatelist: any[] = [];
    loading: boolean = true;

    constructor(
        private certificateService: CertificateService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.certificateService.get_AllCertificate().subscribe({
            next: (response) => {
                try {
                    const certificateList = response?.ml_certificate ?? [];
                    this.certificatelist = certificateList.map((cert: any, idx: number) => ({
                        id: idx + 1,
                        userName: cert.userName,
                        certificateName: cert.certificateName,
                        certificateType: cert.certificateType,
                        issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
                        certificateURL: cert.certificateURL,
                        isRevoked: cert.isRevoked,
                        isActive: cert.isActive,
                    }));
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    console.error('Error handling certificates response', e);
                }
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Load Failed',
                    detail: 'Failed to load certificates'
                });
                console.error('Certificates API error:', err);
            }
        });

    }

    addCertificate() {
        this.router.navigate(['/certificates/certificate-new']);
    }
}
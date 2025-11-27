import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { LoginService } from '@/layout/service/login.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterModule,
        RippleModule,
        InputGroup,
        InputGroupAddon,
        CommonModule
    ],
    template: `<div class="h-screen flex w-full bg-surface-50 dark:bg-surface-950">
            <div class="flex flex-1 flex-col bg-surface-50 dark:bg-surface-950 items-center justify-center">
                <div class="w-11/12 sm:w-[30rem]">
                    <div *ngIf="errorMessage1" class="text-red-500 text-center text-sm py-1">{{ this.errorMessage1 }}</div>
                    <div *ngIf="errorMessage" class="text-red-500 text-center text-sm py-1">{{ errorMessage }}</div>
                    <div class="flex flex-col gap-4 mt-12">
                        <p-input-group>
                            <p-inputgroup-addon>
                                <i class="pi pi-user"></i>
                            </p-inputgroup-addon>
                            <input pInputText type="text" [(ngModel)]="email" placeholder="Email" name="email" required [class.ng-invalid]="email === ''" />
                        </p-input-group>
                        <div *ngIf="submitted && email === ''" class="text-red-500 text-xs mt-1">Please fill the email</div>
                        <p-input-group>
                            <p-inputgroup-addon>
                                <i class="pi pi-key"></i>
                            </p-inputgroup-addon>
                            <input pInputText [type]="showPassword ? 'text' : 'password'" [(ngModel)]="password" placeholder="Password" name="password" required [class.ng-invalid]="password === ''" />
                            <p-inputgroup-addon>
                                <button type="button" (click)="togglePasswordVisibility()" class="p-button-text p-button-plain" style="border: none; background: transparent; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center;">
                                    <i [class]="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                                </button>
                            </p-inputgroup-addon>
                        </p-input-group>
                        <div *ngIf="submitted && password === ''" class="text-red-500 text-xs mt-1">Please fill the password</div>
                        <div>
                            <button pButton pRipple  (click)="login()" class="w-full" label="LOGIN"></button>
                        </div>
                        <div>
                            <button pButton pRipple class="w-full text-primary-500" text label="FORGOT PASSWORD?"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div [style]="{ backgroundImage: 'url(/images/pages/Login-Logo.jpg)' }" class="hidden lg:flex flex-1 items-center justify-center bg-cover">                
            </div>
        </div>`
})
export class Login implements OnInit {
    password: string = '';
    email: string = '';
    errorMessage: string = '';
    errorMessage1: string = '';
    submitted: boolean = false;
    showPassword: boolean = false;

    constructor(private loginService: LoginService, private router: Router) {}

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    ngOnInit() {
        // If user is already logged in (has session storage values), redirect to dashboard
        const username = sessionStorage.getItem('username');
        const loginToken = sessionStorage.getItem('m_login_token');
        
        if (username && loginToken) {
            this.router.navigate(['/dashboards']);
        }
    }

    login() {
        this.submitted = true;
        this.errorMessage = '';
        this.errorMessage1 = '';

        if (!this.email || this.email.trim() === '') {
            this.errorMessage = 'Please fill the email';
            return;
        }
        if (!this.password || this.password.trim() === '') {
            this.errorMessage = 'Please fill the password';
            return;
        }

        this.loginService.login(this.email, this.password).subscribe({
            next: (response) => {
                if (response && response.returnMessage && response.returnMessage.trim().length > 0) {
                    this.errorMessage1 = response.returnMessage;
                    return;
                }
                const firstName = response && response.m_user && response.m_user.firstName ? response.m_user.firstName : '';
                const lastName = response && response.m_user && response.m_user.lastName ? response.m_user.lastName : '';
                const username = `${firstName} ${lastName}`.trim() || this.email;
                const role = response && response.m_user_login ? response.m_user_login.userRoleName : undefined;
                const loginToken = response && response.m_login_token ? response.m_login_token : undefined;
                const userID = response && response.m_user ? response.m_user.id : undefined;

                try {
                    sessionStorage.setItem('username', String(username));
                    if (role !== undefined && role !== null) {
                        sessionStorage.setItem('role', String(role));
                    }
                    if (loginToken !== undefined && loginToken !== null) {
                        sessionStorage.setItem('m_login_token', String(loginToken));
                    }
                    if (userID !== undefined && userID !== null) {
                        sessionStorage.setItem('m_user_id', String(userID));
                    }
                } catch {}
                this.router.navigate(['/dashboards']);
            },
            error: (error) => {
                // Show a specific error message for network or server errors
                if (
                    error && 
                    (error.status === 0 || error.status >= 500)
                ) {
                    this.errorMessage = 'Invalid username or password.';
                } else if (error && error.status === 401) {
                    this.errorMessage = 'Invalid username or password.';
                } else if (error && error.error && error.error.message) {
                    this.errorMessage = error.error.message;
                } else if (error && error.statusText) {
                    this.errorMessage = error.statusText;
                } else {
                    this.errorMessage = 'Unknown error occurred. Please try again.';
                }
                console.error('[Login Error]', error);
            }
        });
    }
}

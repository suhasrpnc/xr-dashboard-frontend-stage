import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    
    // Check if session storage values exist
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    const loginToken = sessionStorage.getItem('m_login_token');
    
    // If any of the required values are missing, redirect to login
    if (!username || !loginToken) {
        // Clear any remaining session storage values
        sessionStorage.clear();
        router.navigate(['/auth']);
        return false;
    }
    
    // If all values exist, allow access
    return true;
};


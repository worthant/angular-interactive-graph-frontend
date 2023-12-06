import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn = false;

    constructor() {}

    // Method to check login status
    public isAuthenticated(): boolean {
        return this.isLoggedIn;
    }

    // Method to handle login
    public login(): void {
        this.isLoggedIn = true;
        // You can store user token or user data here
    }

    // Method to handle logout
    public logout(): void {
        this.isLoggedIn = false;
        // Also clear token or user data
    }
}

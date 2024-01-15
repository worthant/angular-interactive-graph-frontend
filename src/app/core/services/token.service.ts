import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly tokenKey = 'auth_token';

    saveToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;

        try {
            const decoded = jwtDecode(token);
            const now = Date.now().valueOf() / 1000;
            // Check if the token has expired
            if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
                return true;
            }
        } catch (error) {
            // In case of an error decoding, consider the token expired
            return true;
        }
        return false;
    }

    // TODO: Add a method to calculate token expiration time


    // Decoded by hand for fun, not using it for production obviously :)
    decodeToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    saveCredentials(email: string, password: string) {
        const credentials = { email, password };
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }
    
    getCredentials(): { email: string, password: string } | null {
        const credentialsJSON = localStorage.getItem('credentials');
        if (credentialsJSON) {
            return JSON.parse(credentialsJSON);
        }
        return null;
    }
    
    clearCredentials() {
        localStorage.removeItem('credentials');
    }
}

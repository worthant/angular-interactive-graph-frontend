import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'https://delicate-corgi-brightly.ngrok-free.app/api';

    constructor(private http: HttpClient) {}

    signup(data: any) {
        return this.http.post(`${this.apiUrl}/auth/signup`, data);
    }

    login(data: any) {
        return this.http.post(`${this.apiUrl}/auth/login`, data);
    }

    logout() {
        return this.http.post(`${this.apiUrl}/auth/logout`, {});
    }

    // TODO: check this logic
}

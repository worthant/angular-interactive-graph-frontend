import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'https://delicate-corgi-brightly.ngrok-free.app/api/auth';

    constructor(private http: HttpClient) {}

    signup(data: any) {
        return this.http.post(`${this.apiUrl}/signup`, data);
    }

    login(data: any) {
        return this.http.post(`${this.apiUrl}/login`, data);
    }

    logout() {
        return this.http.post(`${this.apiUrl}/logout`, {});
    }

    // TODO: check this logic
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { SigninRequest } from '../models/signin-request.model';
import { SignupRequest } from '../models/signup-request.model';
import { RestoreRequest } from '../models/restore-request';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'https://delicate-corgi-brightly.ngrok-free.app/api';

    constructor(private http: HttpClient) {}

    signUp(data: SignupRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, data);
    }

    signIn(data: SigninRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data);
    }

    logout() {
        return this.http.post(`${this.apiUrl}/auth/logout`, {});
    }

    restorePassword(data: RestoreRequest) {
        console.log("restore request!");
        return this.http.post(`${this.apiUrl}/auth/restorePassword`, data);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtDTO } from '../dto/jwt.dto';
import { UserDTO } from '../dto/user.dto';
import { EmailDTO } from '../dto/email.dto';
import { TokenService } from './token.service';
import { PointDTO } from '../dto/point.dto';
import { PasswordDTO } from '../dto/password.dto';
import { AdminDTO } from '../dto/admin.dto';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'https://delicate-corgi-brightly.ngrok-free.app/api';

    constructor(private http: HttpClient, private tokenService: TokenService) { }


    // ----------- Authorization ----------
    signUp(data: UserDTO): Observable<JwtDTO> {
        return this.http.post<JwtDTO>(`${this.apiUrl}/auth/signup`, data);
    }

    signIn(data: UserDTO): Observable<JwtDTO> {
        return this.http.post<JwtDTO>(`${this.apiUrl}/auth/login`, data);
    }

    logout() {
        const headers = this.includeJwt();
        return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers });
    }

    restorePassword(data: EmailDTO) {
        console.log("restore request!");
        return this.http.post(`${this.apiUrl}/auth/restorePassword`, data);
    }


    // ----------- Main flow ----------
    addPoint(pointDTO: PointDTO): Observable<PointDTO> {
        const headers = this.includeJwt();
        return this.http.post<PointDTO>(`${this.apiUrl}/user/addPoint`, pointDTO, { headers });
    }

    deletePoint(pointDTO: PointDTO): Observable<any> {
        const headers = this.includeJwt();
        return this.http.post(`${this.apiUrl}/user/deletePoint`, pointDTO, { headers });
    }

    getUserPoints(): Observable<PointDTO[]> {
        const headers = this.includeJwt();
        return this.http.post<PointDTO[]>(`${this.apiUrl}/user/points`, {}, { headers });
    }

    deleteAllPoints(): Observable<any> {
        const headers = this.includeJwt();
        return this.http.delete(`${this.apiUrl}/user/deleteAllPoints`, { headers });
    }

    redrawAllPoints(newRadius: number): Observable<PointDTO[]> {
        const headers = this.includeJwt();
        const params = new HttpParams().set('r', newRadius.toString());
        // Send newRadius as a query parameter
        return this.http.post<PointDTO[]>(`${this.apiUrl}/user/redrawAllPoints`, {}, { headers, params });
    }

    changePassword(passwordDTO: PasswordDTO): Observable<any> {
        const headers = this.includeJwt();
        return this.http.post(`${this.apiUrl}/user/changePassword`, passwordDTO, { headers });
    }


    // ----------- Admin flow ----------
    adminSignIn(adminDto: AdminDTO): Observable<JwtDTO> {
        return this.http.post<JwtDTO>(`${this.apiUrl}/auth/admin`, adminDto);
    }

    getAllUsers(): Observable<UserDTO[]> {
        const headers = this.includeJwt();
        return this.http.post<UserDTO[]>(`${this.apiUrl}/admin/users`, { headers });
    }

    removeUser(userId: number): Observable<any> {
        const headers = this.includeJwt();
        return this.http.delete(`${this.apiUrl}/admin/removeUser/${userId}`, { headers });
    }
    
    



    includeJwt() {
        const token = this.tokenService.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return headers;
    }
}

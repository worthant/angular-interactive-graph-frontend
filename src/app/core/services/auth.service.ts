import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private tokenService: TokenService) {}

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    // TODO: Add logic here to validate the token
    return !!token;
  }
}

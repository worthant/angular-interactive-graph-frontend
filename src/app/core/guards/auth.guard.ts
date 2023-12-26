import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
class PermissionsService {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.authService.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['/user-login']);
        }
        return isAuthenticated;
    }
}

export const AuthGuard: CanActivateFn = (next, state): boolean => {
    return inject(PermissionsService).canActivate(next, state);
};

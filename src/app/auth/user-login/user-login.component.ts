import { Component } from '@angular/core';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle/dark-mode-toggle.component';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { AuthResponse } from '../../core/models/auth-response.model';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
    selector: 'app-user-login',
    standalone: true,
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
    imports: [FontAwesomeModule, FormsModule, HttpClientModule, DarkModeToggleComponent],
})
export class UserLoginComponent {
    // Forms
    username: string = '';
    email: string = '';
    password: string = '';

    // Animation
    isActive: boolean = false;

    // Icons
    faGooglePlusG = faGooglePlusG;
    faFacebookF = faFacebookF;
    faGithub = faGithub;
    faLinkedinIn = faLinkedinIn;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private tokenService: TokenService,
        private errorHandlerService: ErrorHandlerService
    ) {}

    toggleActive(): void {
        this.isActive = !this.isActive;
    }

    signUp() {
        const signUpData = {
            username: this.username,
            email: this.email,
            password: this.password,
        };

        this.apiService.signUp(signUpData).subscribe({
            next: (resp: AuthResponse) => {
                this.tokenService.saveToken(resp.token);
                this.router.navigate(['/dashboard']);
            },
            error: err => this.errorHandlerService.handleError(err),
        });
    }

    signIn() {
        const signData = {
            email: this.email,
            password: this.password,
        };

        this.apiService.signIn(signData).subscribe({
            next: (resp: AuthResponse) => {
                this.tokenService.saveToken(resp.token);
                this.router.navigate(['/dashboard']);
            },
            error: err => this.errorHandlerService.handleError(err),
        });
    }
}

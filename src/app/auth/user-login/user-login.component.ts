import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../core/services/api.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle/dark-mode-toggle.component';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { AuthResponse } from '../../core/models/auth-response.model';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetDialogComponent } from '../../shared/components/password-reset-dialog/password-reset-dialog.component';

@Component({
    selector: 'app-user-login',
    standalone: true,
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        DarkModeToggleComponent,
        MatInputModule,
        MatFormFieldModule,
    ],
})
export class UserLoginComponent {
    // Forms data
    username: string = '';
    email: string = '';
    password: string = '';

    // SignUp form
    signUpForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9_]+$'),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    // SignIn form
    signInForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

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
        private errorHandlerService: ErrorHandlerService,
        private dialog: MatDialog
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

    restorePassword() {
        this.dialog.open(PasswordResetDialogComponent);
      }
}

import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle-slider/dark-mode-toggle.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JwtDTO } from '../../core/dto/jwt.dto';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        DarkModeToggleComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
    ],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
    // Forms data
    username: string = '';
    password: string = '';

    constructor(
        private apiService: ApiService,
        private router: Router,
        private tokenService: TokenService,
        private errorHandlerService: ErrorHandlerService,
    ) {}

    // SignIn form
    signInForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9_]+$'),
        ]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    signIn() {
        const signData = {
            username: this.username,
            password: this.password,
        };

        this.apiService.adminSignIn(signData).subscribe({
            next: (resp: JwtDTO) => {
                this.tokenService.saveToken(resp.token);
                this.tokenService.saveCredentials(this.username, this.password);
                this.router.navigate(['/admin-console/users']);
            },
            error: err => this.errorHandlerService.handleError(err),
        });
    }
}

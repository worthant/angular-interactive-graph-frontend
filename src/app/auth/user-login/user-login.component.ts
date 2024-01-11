import { Component } from '@angular/core';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeToggleComponent } from "../../shared/components/dark-mode-toggle/dark-mode-toggle.component";
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
    selector: 'app-user-login',
    standalone: true,
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
    imports: [FontAwesomeModule, FormsModule, HttpClientModule, DarkModeToggleComponent]
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
    ) { }

    toggleActive(): void {
        this.isActive = !this.isActive;
    }

    signUp() {
        const signUpData = {
            username: this.username,
            email: this.email,
            password: this.password
        };

        this.apiService.signup(signUpData).subscribe({
            next: (resp:any) => {
                this.tokenService.saveToken(resp.token);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                // TODO: handle errors user-friendly
                console.error(err);
            }
        })
    }

    signIn() {
        const loginData = {
            email: this.email,
            password: this.password
        };

        this.apiService.login(loginData).subscribe({
            next: (resp:any) => {
                this.tokenService.saveToken(resp.token);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                // TODO: handle errors user-friendly
                console.error(err);
            }
        })
    }

}

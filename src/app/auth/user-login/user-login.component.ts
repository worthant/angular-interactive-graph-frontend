import { Component } from '@angular/core';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeToggleComponent } from "../../shared/components/dark-mode-toggle/dark-mode-toggle.component";

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
    
    constructor(private apiService: ApiService) {}

    toggleActive(): void {
        this.isActive = !this.isActive;
    }

    signUp() {
        // signUp logic
    }

    signIn() {
        // signIn logic
    }

}

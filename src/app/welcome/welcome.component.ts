import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../core/services/theme.service';

@Component({
    selector: 'app-welcome',
    standalone: true,
    imports: [],
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
    constructor(private router: Router, private themeService: ThemeService) {}

    navigateTologin() {
        this.router.navigate(['/login']);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}

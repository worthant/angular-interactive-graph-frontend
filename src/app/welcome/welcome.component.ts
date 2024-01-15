import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../core/services/theme.service';
import { DarkModeToggleComponent } from '../shared/components/dark-mode-toggle-slider/dark-mode-toggle.component';

@Component({
    selector: 'app-welcome',
    standalone: true,
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss',
    imports: [DarkModeToggleComponent],
})
export class WelcomeComponent {
    constructor(
        private router: Router,
        private themeService: ThemeService
    ) {}

    navigateTologin() {
        this.router.navigate(['/user-login']);
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}

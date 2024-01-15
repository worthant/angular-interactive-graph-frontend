import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-dark-mode-toggle',
    standalone: true,
    imports: [],
    templateUrl: './dark-mode-toggle.component.html',
    styleUrl: './dark-mode-toggle.component.scss',
})
export class DarkModeToggleComponent implements OnInit {
    isDarkMode: boolean;
    uniqueId = `dark-toggle-${Math.random().toString(36).substr(2, 9)}`;

    constructor(private themeService: ThemeService) {
        this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
    }

    ngOnInit(): void {
        document.documentElement.classList.add(this.themeService.getCurrentTheme());
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}

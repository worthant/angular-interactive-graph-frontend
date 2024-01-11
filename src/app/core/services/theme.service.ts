import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.remove(currentTheme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    getCurrentTheme() {
        let theme = localStorage.getItem('theme');
        if (!theme) {
            theme = 'dark';
            localStorage.setItem('theme', theme);
        }
        return theme;
    }

    initTheme() {
        const theme = this.getCurrentTheme();
        document.documentElement.classList.add(theme);
    }
}

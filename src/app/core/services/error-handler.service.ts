import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService } from './theme.service';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService {
    constructor(
        private snackBar: MatSnackBar,
        private themeService: ThemeService
    ) {}

    public handleError(error: any): void {
        if (error instanceof HttpErrorResponse) {
            if (error.status === 400 && error.error && typeof error.error === 'object') {
                this.processValidationErrors(error.error.errorMessage);
            } else {
                this.showErrorSnackBar('The fucking helios is down again');
            }
        } else {
            this.showErrorSnackBar('An unexpected error occurred.');
        }
    }

    private processValidationErrors(errorMessages: string): void {
        const messages = errorMessages
            .split(',')
            .map(msg => `• ${msg.replace(/[\w\.]+:/, '').trim()}`)
            .filter(msg => msg)
            .join('\n');

        if (messages) {
            this.showErrorSnackBar(messages, 8000);
        }
    }

    private showErrorSnackBar(message: string, duration: number = 3000): void {
        const themeClass =
            this.themeService.getCurrentTheme() === 'dark' ? 'snackbar-dark-theme' : 'snackbar-light-theme';
        this.snackBar.open(message, 'Close', {
            duration: duration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['multiline-snackbar', themeClass],
        });
    }
}

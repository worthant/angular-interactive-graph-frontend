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
    ) { }

    public handleError(error: any): void {
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            this.showErrorSnackBar('An unexpected error occurred.');
        } else if (error) {
            // Backend returned an unsuccessful response code
            switch (error.status) {
                case 400: // Bad Request
                    this.processValidationErrors(error.error.errorMessage);
                    break;
                case 401: // Unauthorized
                    this.showErrorSnackBar('Authentication failed: ' + error.error);
                    break;
                case 404: // Not Found
                    this.showErrorSnackBar('Resource not found.');
                    break;
                case 409: // Conflict
                    this.showErrorSnackBar('Conflict: ' + error.error);
                    break;
                case 500: // Internal Server Error
                    this.showErrorSnackBar('Internal server error.');
                    break;
                default:
                    if (error.status != 200) {
                        this.showErrorSnackBar('The fucking helios is down again');
                    }
                    break;
            }
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

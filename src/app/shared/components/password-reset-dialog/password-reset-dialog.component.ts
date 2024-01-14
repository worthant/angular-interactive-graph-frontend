import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-password-reset-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './password-reset-dialog.component.html',
    styleUrl: './password-reset-dialog.component.scss',
})
export class PasswordResetDialogComponent {
    email: string = '';

    constructor(
        public dialogRef: MatDialogRef<PasswordResetDialogComponent>,
        private apiService: ApiService,
        private errorHandlerService: ErrorHandlerService
    ) {}

    resetForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    resetPassword() {
        console.log("resetPassword()");

        const restoreData = {
            email: this.email
        };

        if (this.email) {
            this.apiService.restorePassword(restoreData).subscribe({
                next: resp => {
                    this.dialogRef.close();
                },
                error: err => {
                    this.errorHandlerService.handleError(err)
                }
            });
        }
    }
}

import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle-slider/dark-mode-toggle.component';
import { PasswordDTO } from '../../core/dto/password.dto';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        HttpClientModule,
        DarkModeToggleComponent,
        MatInputModule,
        MatFormFieldModule,
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    constructor(
        private apiService: ApiService,
        private errorHandlerService: ErrorHandlerService,
    ) { }

    // ChangePassword form
    changePasswordForm = new FormGroup({
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const newPassword = control.get('newPassword')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        const currentPassword = control.get('currentPassword')?.value;

        // New password must not be the same as the current password
        // and must match the confirm password field
        if (newPassword === currentPassword) {
            return { sameAsOld: true };
        }

        if (currentPassword !== confirmPassword) {
            return { passwordMismatch: true };
        }

        return null; // If validation passes, return null
    }


    onSubmit(): void {
        console.log('submit');
        if (this.changePasswordForm.valid) {
            console.log('Form Data:', this.changePasswordForm.value);
            if (this.changePasswordForm.value.newPassword) {
                const passwordDto: PasswordDTO = {
                    password: this.changePasswordForm.value.newPassword,
                };

                this.apiService.changePassword(passwordDto).subscribe({
                    next: (resp) => {
                        this.errorHandlerService.showErrorSnackBar(
                            resp
                            , 8000);
                    },
                    error: err => this.errorHandlerService.handleError(err),
                });

            }
        }
    }



    hireMeI18n() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this i18n feature!)"
            , 8000);
    }

    hireMePicture() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this Upload picture feature!)"
            , 8000);
    }

    hireMeDisconnect() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this Disconnect feature!)"
            , 8000);
    }

    hireMeConnect() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this Connect feature!)"
            , 8000);
    }

    hireMeSocial() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement those Social intergations!)"
            , 8000);
    }

    hireMeGeneralInfo() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement those General settings saving!)"
            , 8000);
    }

    hireMeRevoke() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this Revoke feature!)"
            , 8000);
    }

    hireMeSeeMore() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this See more feature!)"
            , 8000);
    }

    hireMeDelete() {
        this.errorHandlerService.showErrorSnackBar(
            "Hire me and i will implement this Delete feature!)"
            , 8000);
    }
}

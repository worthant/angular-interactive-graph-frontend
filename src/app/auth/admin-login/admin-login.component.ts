import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle-slider/dark-mode-toggle.component';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        DarkModeToggleComponent,
    ],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
    constructor(
        private apiService: ApiService,
        private router: Router,
        private tokenService: TokenService,
        private errorHandlerService: ErrorHandlerService,
    ) {}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  constructor(
		private apiService: ApiService, 
		private tokenService: TokenService, 
		private router: Router
	) {}

    logout() {
        this.apiService.logout().subscribe({
            next: () => {
                this.tokenService.removeToken();
                this.router.navigate(['/admin-login']);
            },
            error: (err) => {
                console.error(err);
                this.tokenService.removeToken();
                this.router.navigate(['/admin-login']);
            }
        });
    }
}

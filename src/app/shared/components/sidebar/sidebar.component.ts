import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TokenService } from '../../../core/services/token.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
	constructor(
		private apiService: ApiService, 
		private tokenService: TokenService, 
		private router: Router
	) {}

    logout() {
        this.apiService.logout().subscribe({
            next: () => {
                this.tokenService.removeToken();
                this.router.navigate(['/user-login']);
            },
            error: (err) => {
                console.error(err);
                this.tokenService.removeToken();
                this.router.navigate(['/user-login']);
            }
        });
    }
}

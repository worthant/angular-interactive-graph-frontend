import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer, map } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { TokenService } from '../../core/services/token.service';
import { UserDTO } from '../../core/dto/user.dto';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-admin-users',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './admin-users.component.html',
	styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit, OnDestroy {
	private timerSubscription!: Subscription;
	users: UserDTO[] = [];

	constructor(
		private tokenService: TokenService,
		private apiService: ApiService,
		private errorService: ErrorHandlerService,
	) { }

	ngOnInit(): void {
		this.timerSubscription = timer(0, 10000)
			.pipe(map(() => {
				this.getUsers();
			}))
			.subscribe();
		this.getUsers();
	}

	ngOnDestroy(): void {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
	}

	getUsers(): void {
		this.apiService.getAllUsers().subscribe({
			next: (users) => {
				// add each one
				this.users = users;
				console.log(users);
			},
			error: (err) => this.errorService.handleError(err)
		})
	}

	deleteUser(userId: number): void {
		this.apiService.removeUser(userId).subscribe({
			next: () => {
				// Remove the user from the list or refresh the list
				this.users = this.users.filter(user => user.userId !== userId);
			},
			error: (err) => this.errorService.handleError(err)
		});
	}
	

}

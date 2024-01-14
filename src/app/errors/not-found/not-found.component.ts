import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
navigateBack() {
throw new Error('Method not implemented.');
}
    constructor(private router: Router) {}

    navigateToWelcomePage() {
        this.router.navigate(['']);
    }
}

import { Component } from '@angular/core';
import { DarkModeToggleBtnComponent } from "../dark-mode-toggle-btn/dark-mode-toggle-btn.component";
import { DarkModeToggleComponent } from "../dark-mode-toggle-slider/dark-mode-toggle.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [DarkModeToggleBtnComponent, DarkModeToggleComponent]
})
export class NavbarComponent {
	navigateTo() {}
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AdminSidebarComponent } from '../../shared/components/admin-sidebar/admin-sidebar.component';

@Component({
    selector: 'app-admin-console',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, AdminSidebarComponent],
    templateUrl: './admin-console.component.html',
    styleUrl: './admin-console.component.scss',
})
export class AdminConsoleComponent {}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from './core/services/theme.service';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FontAwesomeModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'angular-interactive-graph-frontend';

    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        this.themeService.initTheme();
        initFlowbite();
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer, map } from 'rxjs';
import { PointDTO } from '../../core/dto/point.dto';
import { ApiService } from '../../core/services/api.service';
import { TokenService } from '../../core/services/token.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgxChartsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
    jwtExpiryDate: Date | null = null;
    userPoints: PointDTO[] = [];
    hitPercentage = 0;
    sessionTime = 0; // in seconds
    private timerSubscription!: Subscription;

    constructor(
        private tokenService: TokenService,
        private apiService: ApiService,
        private errorService: ErrorHandlerService,
    ) { }

    ngOnInit(): void {
        this.timerSubscription = timer(0, 1000)
            .pipe(map(() => {
                this.updateJwtExpiryDate();
                this.updateSessionTime();
            }))
            .subscribe();
        this.getUserPoints();
    }

    ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    private updateJwtExpiryDate(): void {
        const secondsUntilExpiry = this.tokenService.howMuchTillTokenExpired();
        this.jwtExpiryDate = new Date(Date.now() + secondsUntilExpiry * 1000);
    }

    private updateSessionTime(): void {
        const tokenLifetime = 25 * 60; // JWT lifetime in seconds (25 minutes)
        const secondsUntilExpiry = this.tokenService.howMuchTillTokenExpired();
        this.sessionTime = tokenLifetime - secondsUntilExpiry;
    }

    private getUserPoints(): void {
        this.apiService.getUserPoints().subscribe({
            next: (points) => {
                this.userPoints = points;
                console.log(points);
                this.calculateHitPercentage();
            },
            error: (err) => this.errorService.handleError(err)
        });
    }

    private calculateHitPercentage(): void {
        if (this.userPoints.length === 0) return;

        const hitCount = this.userPoints.filter(point => point.result).length;
        this.hitPercentage = (hitCount / this.userPoints.length) * 100;
    }
}


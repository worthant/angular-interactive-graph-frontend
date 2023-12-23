import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminConsoleComponent } from './admin/admin-console/admin-console.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-console', component: AdminConsoleComponent, canActivate: [AuthGuard] },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

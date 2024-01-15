import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminConsoleComponent } from './admin/admin-console/admin-console.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CanvasComponent } from './user/canvas/canvas.component';
import { SettingsComponent } from './user/settings/settings.component';
import { DocumentationComponent } from './user/documentation/documentation.component';
import { HelpComponent } from './user/help/help.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'user-login', component: UserLoginComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    {
        path: 'main',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'canvas', component: CanvasComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'documentation', component: DocumentationComponent},
            { path: 'help', component: HelpComponent }
        ]
    },
    { path: 'admin-console', component: AdminConsoleComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

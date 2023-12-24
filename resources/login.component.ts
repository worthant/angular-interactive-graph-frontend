import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    form: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
    });

    constructor(
        private router: Router
    ) {}

    login() {
        // if (this.form.valid) {
        //   this.authService.login({
        //     username: this.username.value,
        //     password: this.password.value
        //   }).pipe(
        //     tap(() => this.router.navigate(['../../private/dashboard']))
        //   ).subscribe()
        // }
        tap(() => this.router.navigate(['../../private/graph']));
    }

    get email(): FormControl {
        return this.form.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.form.get('password') as FormControl;
    }
}

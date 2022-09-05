import {HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@knights-fights/auth';
import { NotifyService } from '@knights-fights/ui';

@Component({
  selector: 'knights-fights-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  constructor(
    private notify: NotifyService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    if (!form.valid) return;
    this.loading = true;
    this.auth.login(form.value.email, form.value.password)
      .pipe(catchError((err: HttpErrorResponse) => {
        this.loading = false;
        this.notify.error(err.error.message);
        return throwError(() => new Error(err.error.message))
      }))
      .subscribe(user => {
        this.loading = false;
        form.reset();
        console.log(user)
      });
  }
}

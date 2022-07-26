import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '@knights-fights/api-interfaces';
import { AuthService } from '@knights-fights/auth';
import { NotifyService } from '@knights-fights/ui';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'knights-fights-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(
    private http: HttpClient,
    private notify: NotifyService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
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

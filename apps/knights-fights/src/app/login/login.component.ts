import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '@knights-fights/api-interfaces';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'knights-fights-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.loading = true;
    this.http
      .post<User>('api/auth/signin', form.value)
      .pipe(catchError(err => {
        console.log(err)
        return throwError(() => new Error(err))
      }))
      .subscribe(user => {
        this.loading = false;
        console.log(user)
      });
    form.reset();
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '@knights-fights/api-interfaces';

@Component({
  selector: 'knights-fights-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.http
      .post<User>('api/auth/signin', form.value)
      .subscribe(user => console.log(user));
    form.reset();
  }

}

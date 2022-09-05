import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@knights-fights/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string ) {
    return this.http
      .post<User>('api/auth/signin', { email, password })
  }

  register(username: string, email: string, password: string) {
    return this.http
      .post<User>('api/auth/signup', { username, email, password })
  }
}

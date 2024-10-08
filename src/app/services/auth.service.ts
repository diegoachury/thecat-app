import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }
  register(userDetails: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, userDetails);
  }
}

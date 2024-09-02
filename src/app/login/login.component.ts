import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Logged in successfully:', response);

        localStorage.setItem('token', response.token);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials';
      },
    });
  }
}

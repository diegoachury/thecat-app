import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

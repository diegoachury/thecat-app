import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  standalone: true,
  providers: [AuthService],
})
export class SignupComponent {
  user = { email: '', password: '', firstName: '', lastName: '', username: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (
      this.user.username &&
      this.user.email &&
      this.user.password &&
      this.user.firstName &&
      this.user.lastName
    ) {
      this.authService.register(this.user).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
}

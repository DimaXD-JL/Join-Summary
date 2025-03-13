/**
 * LoginComponent - Handles user authentication and login functionality.
 *
 * This component provides:
 * - Email and password input fields, with validation errors for both.
 * - A login method that calls the AuthService to authenticate the user.
 * - An option to log in as a guest user with prefilled credentials.
 * - Toggle functionality to show or hide the password text.
 * - Basic error handling and form validation feedback for incorrect inputs.
 */
import { Component, inject } from '@angular/core';
import { AuthService } from './../firebase-service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  constructor(private router: Router) {} // Router instance for navigation.
  authService = inject(AuthService); // AuthService instance used to perform authentication actions.

  /**
   * User-provided email input.
   */
  email = '';

  /**
   * User-provided password input.
   */
  password = '';

  /**
   * Validation error message for the email input.
   */
  emailError = '';

  /**
   * Validation error message for the password input.
   */
  passwordError = '';

  /**
   * General error message for login-related issues.
   */
  generalError = '';

  /**
   * Regex pattern used for validating email addresses.
   */
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  /**
   * Error message displayed when the email format is invalid.
   */
  emailPatternError = 'Please enter a valid email address.';

  /**
   * Tracks whether the email field has been touched (for validation).
   */
  emailTouched = false;

  /**
   * Tracks whether the password field has been touched (for validation).
   */
  passwordTouched = false;

  /**
   * Controls whether the password is displayed in plain text.
   */
  showPassword = false;

  /**
   * Attempts to authenticate the user with the provided email and password.
   * 
   * If either field is empty, it sets an appropriate error message. 
   * Otherwise, it calls the AuthService to log in. 
   * Upon success, navigates to the "summary" route. 
   * Sets the generalError property if login fails.
   */
  async login() {
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';

    if (!this.email) {
      this.emailError = 'Email is required.';
    }
    if (!this.password) {
      this.passwordError = 'Password is required.';
    }
    if (this.emailError || this.passwordError) {
      return;
    }

    try {
      await this.authService.login(this.email, this.password);
      await firstValueFrom(this.authService.isLoggedIn$());
      this.router.navigate(['/summary']);
    } catch (error: any) {
      if (error?.code === 'auth/wrong-password') {
        this.generalError = 'Your password is wrong';
      } else {
        this.passwordError = 'Your password is wrong';
      }
    }
  }

  /**
   * Fills the email and password fields with pre-defined guest credentials.
   */
  guestLogin() {
    this.email = 'michaelspari@gmx.de';
    this.password = 'gast123';
  }

  /**
   * Validates the current email value. 
   * Sets an error message if the email is empty or doesn't match the pattern.
   */
  validateEmail() {
    this.emailError = '';
    if (!this.email) {
      this.emailError = 'Email is required.';
    }
    if (this.email && !this.email.match(this.emailPattern)) {
      this.emailError = this.emailPatternError;
    }
  }

  /**
   * Validates the current password value. 
   * Sets an error message if the password is empty.
   */
  validatePassword() {
    this.passwordError = '';
    if (!this.password) {
      this.passwordError = 'Password is required.';
    }
  }

  /**
   * Toggles the visibility of the password input field.
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

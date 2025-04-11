import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../app/services/login-service.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  myForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.loginService.login(this.username?.value, this.password?.value).subscribe({
        next:(response) => {
          console.log('Login Successful', response);
          alert('Login Successful');
          localStorage.setItem('login', '1');
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', this.username?.value)
          this.router.navigate(['/home']);
        },
        error:(error) => {
          console.error('Login Failed', error);
          alert('Invalid credentials');
        }
    });
    }
  }
  signup(): void {
    this.router.navigate(['/signup']);
  }
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.signup();
    }
  }
}
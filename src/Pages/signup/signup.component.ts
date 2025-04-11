import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpServiceService } from '../../app/services/sign-up-service.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css'] 
})
export class SignupComponent {
  myForm!: FormGroup;
  showPassword: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly signUpService: SignUpServiceService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  get username() {
    return this.myForm.get('username');
  }

  get phoneNo() {
    return this.myForm.get('phoneNo');
  }

  get password() {
    return this.myForm.get('password');
  }

  get confirmPassword() {
    return this.myForm.get('confirmPassword');
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.signUpService.register(this.username?.value, this.phoneNo?.value, this.password?.value).subscribe({
        next: response => {
          console.log('Registration Successful', response);
          alert('Signed up successfully...');
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Registration Failed', error);
          alert('Registration failed');
        }
      });
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}


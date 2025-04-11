import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { SignUpServiceService } from '../../app/services/sign-up-service.service';
import { CommonModule } from '@angular/common';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signUpService: jasmine.SpyObj<SignUpServiceService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const signUpServiceSpy = jasmine.createSpyObj('SignUpServiceService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SignupComponent, ReactiveFormsModule, CommonModule],
      providers: [
        { provide: SignUpServiceService, useValue: signUpServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    signUpService = TestBed.inject(SignUpServiceService) as jasmine.SpyObj<SignUpServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username, phoneNo, password, and confirmPassword fields', () => {
    expect(component.myForm.contains('username')).toBeTrue();
    expect(component.myForm.contains('phoneNo')).toBeTrue();
    expect(component.myForm.contains('password')).toBeTrue();
    expect(component.myForm.contains('confirmPassword')).toBeTrue();
  });

  it('should make the username, phoneNo, password, and confirmPassword fields required', () => {
    const usernameControl = component.myForm.get('username');
    const phoneNoControl = component.myForm.get('phoneNo');
    const passwordControl = component.myForm.get('password');
    const confirmPasswordControl = component.myForm.get('confirmPassword');

    usernameControl?.setValue('');
    phoneNoControl?.setValue('');
    passwordControl?.setValue('');
    confirmPasswordControl?.setValue('');

    expect(usernameControl?.valid).toBeFalse();
    expect(phoneNoControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
    expect(confirmPasswordControl?.valid).toBeFalse();
  });

  it('should validate the minimum length of username and password', () => {
    const usernameControl = component.myForm.get('username');
    const passwordControl = component.myForm.get('password');

    usernameControl?.setValue('abc');
    passwordControl?.setValue('1234567');

    expect(usernameControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
  });

  it('should validate the phone number pattern', () => {
    const phoneNoControl = component.myForm.get('phoneNo');

    phoneNoControl?.setValue('12345');
    expect(phoneNoControl?.valid).toBeFalse();

    phoneNoControl?.setValue('1234567890');
    expect(phoneNoControl?.valid).toBeTrue();
  });

  it('should validate password and confirmPassword match', () => {
    const passwordControl = component.myForm.get('password');
    const confirmPasswordControl = component.myForm.get('confirmPassword');
  
    passwordControl?.setValue('password123');
    confirmPasswordControl?.setValue('password1234');
  
    fixture.detectChanges();
    
    expect(component.myForm.hasError('mismatch')).toBeTrue(); // ✅ Corrected
  
    confirmPasswordControl?.setValue('password123');
    
    fixture.detectChanges();
    
    expect(component.myForm.hasError('mismatch')).toBeFalse(); // ✅ Corrected
  });
  
  it('should call sign up service on form submit if form is valid', () => {
    const signUpResponse = { userId: '123' };
    signUpService.register.and.returnValue(of(signUpResponse));

    component.myForm.setValue({ username: 'testuser', phoneNo: '1234567890', password: 'testpassword', confirmPassword: 'testpassword' });
    component.onSubmit();

    expect(signUpService.register).toHaveBeenCalledWith('testuser', '1234567890', 'testpassword');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration error', () => {
    signUpService.register.and.returnValue(throwError(() => new Error('Registration Failed')));

    component.myForm.setValue({ username: 'testuser', phoneNo: '1234567890', password: 'testpassword', confirmPassword: 'testpassword' });
    component.onSubmit();

    expect(signUpService.register).toHaveBeenCalledWith('testuser', '1234567890', 'testpassword');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginServiceService } from '../../app/services/login-service.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginServiceService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginServiceService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent], // ✅ Fix here
      providers: [
        { provide: LoginServiceService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginServiceService) as jasmine.SpyObj<LoginServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password fields', () => {
    expect(component.myForm.contains('username')).toBeTrue();
    expect(component.myForm.contains('password')).toBeTrue();
  });

  it('should make the username and password fields required', () => {
    const usernameControl = component.myForm.get('username');
    const passwordControl = component.myForm.get('password');

    usernameControl?.setValue('');
    passwordControl?.setValue('');

    expect(usernameControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
  });

  it('should validate the minimum length of username and password', () => {
    const usernameControl = component.myForm.get('username');
    const passwordControl = component.myForm.get('password');

    usernameControl?.setValue('abc');
    passwordControl?.setValue('1234567');

    expect(usernameControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();
  });

  it('should call login service on form submit if form is valid', () => {
    const loginResponse = { userId: '123' };
    loginService.login.and.returnValue(of(loginResponse));

    component.myForm.setValue({ username: 'testuser', password: 'testpassword' });
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login error', () => {
    loginService.login.and.returnValue(throwError(() => new Error('Login Failed')));

    component.myForm.setValue({ username: 'testuser', password: 'testpassword' });
    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
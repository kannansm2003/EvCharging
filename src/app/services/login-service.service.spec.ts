import { TestBed } from '@angular/core/testing';
import { LoginServiceService } from './login-service.service';
import { provideHttpClient } from '@angular/common/http'; 

describe('LoginServiceService', () => {
  let service: LoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] 
    });
    service = TestBed.inject(LoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

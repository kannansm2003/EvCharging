import { TestBed } from '@angular/core/testing';
import { SignUpServiceService } from './sign-up-service.service';
import { provideHttpClient } from '@angular/common/http'; 

describe('SignUpServiceService', () => {
  let service: SignUpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] 
    });
    service = TestBed.inject(SignUpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

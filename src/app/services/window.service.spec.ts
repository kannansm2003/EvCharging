import { TestBed } from '@angular/core/testing';
import { UserHistoryService } from './user-history.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserHistoryService', () => {
  let service: UserHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()] 
    });
    service = TestBed.inject(UserHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

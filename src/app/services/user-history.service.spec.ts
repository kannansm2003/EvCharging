import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http'; 
import { UserHistoryService } from './user-history.service';

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

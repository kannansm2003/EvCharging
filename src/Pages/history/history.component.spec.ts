import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UserHistoryService } from '../../app/services/user-history.service';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyService: jasmine.SpyObj<UserHistoryService>;

  beforeEach(async () => {
    const historyServiceSpy = jasmine.createSpyObj('UserHistoryService', ['getBookingHistory']);
    spyOn(localStorage, 'getItem').and.returnValue('1');
    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers: [{ provide: UserHistoryService, useValue: historyServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    historyService = TestBed.inject(UserHistoryService) as jasmine.SpyObj<UserHistoryService>;

    // Return an empty observable by default to avoid `undefined` error
    historyService.getBookingHistory.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title "History"', () => {
    const titleElement = fixture.debugElement.query(By.css('.title h1')).nativeElement;
    expect(titleElement.textContent).toBe('History');
  });

  it('should display user information if booking history is available', () => {
    const mockHistory = [
      { user: { username: 'JohnDoe', phoneNo: '1234567890' }, chargingStation: { location: 'Station 1' }, date: '2025-03-20', charger: { id: 'CHG123' }, slotNo: 1, bookingTime: new Date() }
    ];
    historyService.getBookingHistory.and.returnValue(of(mockHistory));
    component.loadBookingHistory();
    fixture.detectChanges();

    const usernameElement = fixture.debugElement.query(By.css('.Username p')).nativeElement;
    const phoneElement = fixture.debugElement.query(By.css('.Phone p')).nativeElement;
    expect(usernameElement.textContent).toContain('Username: JohnDoe');
    expect(phoneElement.textContent).toContain('Phone No: 1234567890');
  });

  it('should display booking history in table', () => {
    const mockHistory = [
      { user: { username: 'JohnDoe', phoneNo: '1234567890' }, chargingStation: { location: 'Station 1' }, date: '2025-03-20', charger: { id: 'CHG123' }, slotNo: 1, bookingTime: new Date() }
    ];
    historyService.getBookingHistory.and.returnValue(of(mockHistory));
    component.loadBookingHistory();
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(1);
    const cells = tableRows[0].queryAll(By.css('td'));
    expect(cells[0].nativeElement.textContent).toContain('Station 1');
    expect(cells[1].nativeElement.textContent).toContain('2025-03-20');
    expect(cells[2].nativeElement.textContent).toContain('CHG123');
    expect(cells[3].nativeElement.textContent).toContain('1');
  });

  it('should handle empty booking history', () => {
    historyService.getBookingHistory.and.returnValue(of([]));
    component.loadBookingHistory();
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(0);
  });

  it('should call getBookingHistory with correct userId', () => {
    component.loadBookingHistory();
    expect(historyService.getBookingHistory).toHaveBeenCalledWith(1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { WindowService } from '../../app/services/window.service';
import { ActivatedRoute } from '@angular/router';
  import { of } from 'rxjs';
class MockWindowService {
  nativeWindow = {
    localStorage: {
      getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
        if (key === 'username') return 'testUser';
        if (key === 'login') return '1';
        return null;
      }),
      clear: jasmine.createSpy('clear')
    },
    location: {
      replace: jasmine.createSpy('replace')
    }
  };
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let windowService: MockWindowService;
  
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent], 
      providers: [
        { provide: WindowService, useClass: MockWindowService },
        { provide: ActivatedRoute, useValue: { params: of({}) } }  // Provide ActivatedRoute mock
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    windowService = TestBed.inject(WindowService) as unknown as MockWindowService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.renault a').textContent).toContain('VoltSpot');
  });

  it('should toggle dropdown visibility', () => {
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeTrue();
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeFalse();
  });

  it('should close dropdown', () => {
    component.isDropdownOpen = true;
    component.closeDropdown();
    expect(component.isDropdownOpen).toBeFalse();
  });

  it('should display username if logged in', () => {
    component.ngOnInit();
    expect(component.profilevisible()).toBeTrue();
    expect(component.username).toBe('testUser');
  });

  it('should logout and clear localStorage', () => {
    component.logout();
    expect(windowService.nativeWindow.localStorage.clear).toHaveBeenCalled();
    expect(windowService.nativeWindow.location.replace).toHaveBeenCalledWith('/');
  });
});
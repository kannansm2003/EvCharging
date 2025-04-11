import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, ActivatedRoute } from '@angular/router'; // ✅ Merged import
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]), // Provide routing support
        provideHttpClient(), // Provide HttpClient
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }, // Mock ActivatedRoute
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogsComponent } from './blogs.component';
import { By } from '@angular/platform-browser';

describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Blogs"', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toBe('Blogs');
  });

  it('should have a description "Read Our News and Articles"', () => {
    const descriptionElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(descriptionElement.textContent).toBe('Read Our News and Articles');
  });

  it('should display charging stations', () => {
    const chargingStations = component.chargingStations;
    expect(chargingStations.length).toBe(2);
    expect(chargingStations[0].name).toBe('EV Station 1');
    expect(chargingStations[1].name).toBe('EV Station 2');
  });

  it('should render images with correct src attributes', () => {
    const images = fixture.debugElement.queryAll(By.css('.charging-image'));
    expect(images.length).toBe(2);
    expect(images[0].nativeElement.src).toContain('assets/blog2.jpg');
    expect(images[1].nativeElement.src).toContain('assets/blog1.jpg');
  });

  it('should render image descriptions with correct links', () => {
    const links = fixture.debugElement.queryAll(By.css('section .imgtext a'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.href).toContain(
      'https://vehq.com/electric-vehicle-tips/'
    );
    expect(links[1].nativeElement.href).toContain(
      'https://www.dnaindia.com/business/report-budget-2025-electric-vehicles-to-get-cheaper-here-what-fm-nirmala-sitharaman-said-in-her-speech-3130093'
    );
  });
});

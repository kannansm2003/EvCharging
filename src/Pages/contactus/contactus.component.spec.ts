import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactusComponent } from './contactus.component';
import { By } from '@angular/platform-browser';
 
describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusComponent], 
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should have a title "Keep Us in the Loop"', () => {
    const titleElement = fixture.debugElement.query(By.css('.header h1')).nativeElement;
    expect(titleElement.textContent).toBe('Keep Us in the Loop');
  });
 
  it('should have a subtitle "Let’s Connect Today!"', () => {
    const subtitleElement = fixture.debugElement.query(By.css('.text-content h1')).nativeElement;
    expect(subtitleElement.textContent).toContain('Let’s Connect Today!');
  });
 
  it('should display contact details', () => {
    const contactDetails = fixture.debugElement.queryAll(By.css('.contact-details p'));
    expect(contactDetails.length).toBe(3);
    expect(contactDetails[0].nativeElement.textContent).toContain('📍 Address:XYZ');
    expect(contactDetails[1].nativeElement.textContent).toContain('📞 Phone:9198946 30520');
    expect(contactDetails[2].nativeElement.textContent).toContain('📧 E-mail:someone@example.com');
  });

 
  it('should render images with correct src attributes', () => {
    const images = fixture.debugElement.queryAll(By.css('.left-section img'));
    expect(images.length).toBe(2);
    expect(images[0].nativeElement.src).toContain('assets/scooter.png');
    expect(images[1].nativeElement.src).toContain('assets/caryellow.png');
  });
});
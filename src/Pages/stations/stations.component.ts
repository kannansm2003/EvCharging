import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StationService } from '../../app/services/stations.service';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent implements OnInit {
  latitude: number | undefined;
  longitude: number | undefined;
  errorMessage: string | undefined;
  chargingStations: any[] = [];

  constructor(
    private readonly stationService: StationService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (isPlatformBrowser(this.platformId) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getNearestStations();
        },
        (error) => {
          this.errorMessage = `Error getting location: ${error.message}`;
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  getNearestStations() {
    if (this.latitude && this.longitude) {
      this.stationService
        .getNearestStations(this.latitude, this.longitude)
        .subscribe({
          next: (response) => {
            console.log('Nearest charging stations:', response);
            this.chargingStations = response;
          },
          error: (error) => {
            console.error('Error fetching charging stations:', error);
            this.errorMessage = 'Failed to load charging stations.';
          },
        });
    }
  }
  storeStationId(stationId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('stationId', stationId.toString());
    }
  }
}

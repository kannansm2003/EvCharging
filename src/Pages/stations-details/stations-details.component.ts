import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { ChargingStationService } from '../../app/services/charging-stations.service';

@Component({
  selector: 'app-stations-details',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './stations-details.component.html',
  styleUrls: ['./stations-details.component.css'],
})
export class StationsDetailsComponent implements OnInit {
  activeTab: string = 'location';
  stationId: string | null = null;
  selectedStationId: number = 0;
  stationDetails: any = null;
  zoom: number = 15;
  mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly chargingStationService: ChargingStationService,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit(): void {
    this.stationId = localStorage.getItem('stationId');
    console.log(this.stationId);
    if (this.stationId && isPlatformBrowser(this.platformId)) {
      this.fetchStationDetails();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  fetchStationDetails() {
    if (this.stationId) {
      this.chargingStationService.getStationDetails(this.stationId).subscribe({
        next: (response) => {
          this.stationDetails = response;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('stationLocation', this.stationDetails.location);
          }
          
          if (this.stationDetails.latitude && this.stationDetails.longitude) {
            this.mapCenter = {
              lat: this.stationDetails.latitude,
              lng: this.stationDetails.longitude,
            };
          }
        },
        error: (error) => {
          console.error('Error fetching station details:', error);
        },
      });
    }
  }
  goToSlotBooking(): void {
    this.router.navigate(['/slotbooking']);
  }
}

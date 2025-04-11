import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SlotAvailableService } from '../../app/services/slot-available.service';

interface Slot {
  slotNo: number;
  status: 'available' | 'booked';
  chargerId: number;
  timeRange:string;
  date: string;
}
interface Charger {
  chargerId: number;
  type: string;
}
@Component({
  selector: 'app-slotbookings',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './slotbookings.component.html',
  styleUrl: './slotbookings.component.css',
})
export class SlotbookingsComponent implements OnInit {
  stationId: number | null = null;
  availableChargers: Charger[] = [];
  slotsByCharger: Map<number, Slot[]> = new Map();
  selectedSlot: number | null = null;
  selectedCharger: Charger | null = null;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly router: Router,
    private readonly slotAvailableService: SlotAvailableService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedStationId = localStorage.getItem('stationId');
      if (storedStationId) {
        this.stationId = parseInt(storedStationId, 10);
        console.log('Station ID:', this.stationId);
        this.fetchAvailableChargers();
      } else {
        console.error('No station ID found in local storage.');
      }
    }
  }

  fetchAvailableChargers(): void {
    if (this.stationId !== null) {
      this.slotAvailableService.getAvailableChargers(this.stationId).subscribe({
        next: (chargers: any) => {  
          console.log('Raw Chargers API Response:', chargers);
  
          if (!chargers || !Array.isArray(chargers)) {
            console.error('Invalid chargers response format:', chargers);
            return;
          }
  
          // Adjusted Mapping: Use 'id' instead of 'chargerId'
          this.availableChargers = chargers.map((charger) => ({
            chargerId: charger.id, // Corrected mapping
            type: charger.type || 'Unknown', // Ensure type exists
          }));
  
          console.log('Mapped Chargers:', this.availableChargers);
  
          this.availableChargers.forEach((charger) => {
            if (charger.chargerId) {
              console.log(`Fetching slots for Charger ID: ${charger.chargerId}`);
              this.fetchAvailableSlots(charger.chargerId);
            } else {
              console.error('Charger ID is still undefined:', charger);
            }
          });
        },
        error: (error) =>
          console.error('Error fetching available chargers:', error),
      });
    }
  }
  
  fetchAvailableSlots(chargerId: number): void {
    this.slotAvailableService.getAvailableSlots(chargerId).subscribe({
      next: (availableSlots: any[]) => {
        console.log(`Slots API Response for Charger ${chargerId}:`, availableSlots);
        
        const slots: Slot[] = availableSlots.map(slot => {
          const [date] = slot.timeRange.split(": "); // Extract date and time
          return {
            slotNo: slot.slotNo,
            timeRange: slot.timeRange,  // Store only the time range
            date: date.trim(),        // Store extracted date separately
            status: slot.status === 'available' ? 'available' : 'booked',
            chargerId: chargerId
          };
        });
  
        this.slotsByCharger.set(chargerId, slots);
        console.log(`Updated slots for Charger ${chargerId}:`, this.slotsByCharger.get(chargerId));
      },
      error: (error) =>
        console.error(`Error fetching slots for Charger ${chargerId}:`, error),
    });
  }
  
  

  getSlotsForCharger(chargerId: number): Slot[] {
    return this.slotsByCharger.get(chargerId) || [];
  }

  getAvailableSlotCount(chargerId: number): number {
    return this.getSlotsForCharger(chargerId).filter(
      (slot) => slot.status === 'available'
    ).length;
  }

  handleSlotClick(slot: Slot, charger: Charger): void {
    if (slot.status === 'available') {
      this.selectedSlot = Number(slot.slotNo);
      this.selectedCharger = charger;

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('slotNo', String(this.selectedSlot));
        localStorage.setItem('selectedCharger', JSON.stringify(this.selectedCharger));
      }

      this.router.navigate(['/payment']);
    }
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
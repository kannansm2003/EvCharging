import { Component, OnInit } from '@angular/core';
import { UserHistoryService } from '../../app/services/user-history.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  bookingHistory: any[] = [];
  userName: string = '';
  phoneNo: string = '';
  constructor(private readonly historyService: UserHistoryService) { }

  ngOnInit(): void {
    this.loadBookingHistory();
  }
  loadBookingHistory() {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem("userId");
      if (userId !== null) {
        this.historyService.getBookingHistory(Number(userId)).subscribe({
          next: (history) => {
            this.bookingHistory = history || [];
          },
          error: (err) => {
            console.error("Error fetching booking history", err);
            this.bookingHistory = [];
          }
        });
      }
    } else {
      console.warn("localStorage is not available in this environment.");
    }
  }
}
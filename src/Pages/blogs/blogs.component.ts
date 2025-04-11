import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  imports: [],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  chargingStations = [
    { name: 'EV Station 1', image: 'assets/ev-charging-1.jpg', description: 'Charging station for fast EV charging.' },
    { name: 'EV Station 2', image: 'assets/ev-charging-2.jpg', description: 'Solar-powered EV charging station.' }
  ];
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../Component/header/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'evChargingStation';

  ngOnInit(): void {
    if(typeof window !=='undefined'){
      localStorage.clear();
      sessionStorage.clear();
    }
  }
}

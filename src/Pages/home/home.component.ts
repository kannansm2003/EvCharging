import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../app/services/window.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username: string | null = '';
  constructor(private readonly windowService:WindowService){}
  ngOnInit(){
    this.isLoggedin();
    this.username = this.windowService.nativeWindow?.localStorage.getItem('username') ?? null;
  }
  isLoggedin():boolean{
    const win = this.windowService.nativeWindow;
    return win ? win.localStorage.getItem("login") === "1" : false;
  }
}

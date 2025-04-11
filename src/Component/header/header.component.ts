import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WindowService } from '../../app/services/window.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = '';
  constructor(private readonly windowService: WindowService) { }
  ngOnInit() {
    this.profilevisible();
    this.username = this.windowService.nativeWindow?.localStorage.getItem('username') ?? null;
  }
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    this.isDropdownOpen = false;
  }
  profilevisible(): boolean {
    const win = this.windowService.nativeWindow;
    return win ? win.localStorage.getItem("login") === "1" : false;
  }
  logout(): void {
    const win = this.windowService.nativeWindow;
    if (win) {
      win.localStorage.clear();
      win.location.replace("/");
    }
  }
}

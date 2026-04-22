import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {

  // Store logged-in user
  user: any;

  // Track login state
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to user state from AuthService
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }
}
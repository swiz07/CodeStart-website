import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;
  user: any;

  constructor(private authService: AuthService, private router: Router) {
    //subscribe to user state
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user; //true is user exists
    })
  }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next:(res:any)=>{
        if(res.status==='Success'){
          this.authService.setUser(res.data) //updates BehaviorSubject
        }
        else{
          this.authService.clearUser();
        }
      },error:()=>{
        this.authService.clearUser();
      }
    });

    this.authService.user$.subscribe((user)=>{
      this.user=user;
      this.isLoggedIn=!!user;
    })
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearUser();
        window.alert('Logged out successfully')
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        window.alert('Logout failed. Please try again.')
      }
    })
  }

  goProfile(){
    this.router.navigate(['/profile'])//navigates to profile page
  }
}


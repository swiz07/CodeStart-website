import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';

/*https://www.youtube.com/watch?v=kmM6mqvnxcs*/
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  user:any;
  isLoggedIn:boolean=false;
  @ViewChild('text') text!: ElementRef;
  @ViewChild('book') book!: ElementRef;
  @ViewChild('parallax') parallax!: ElementRef;

  @HostListener('window:scroll', [])
  onScroll() {
    const value = Math.min(window.scrollY, window.innerHeight);

    this.book.nativeElement.style.transform =
      `translate(-50%, -50%) translateX(${-value * 2.9}px)`;

    this.text.nativeElement.style.transform =
      `translate(-50%, ${value * 2.5}px)`;
  }

  constructor(private authService:AuthService, private router:Router){

  }
  

  ngOnInit(){
    this.authService.getUser().subscribe({
      next:(data)=>{
        console.log(data);
        if(data.status==='Success'){
          this.isLoggedIn=true;
          this.user=data.data
        }
      },
      error:(err)=>{
        console.log(err);
        this.isLoggedIn=false;
      }
    })
  }
  
}






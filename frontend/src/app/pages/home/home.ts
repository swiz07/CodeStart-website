import { Component, HostListener, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service/auth-service';
import { CourseService } from '../../service/course-service/course-service';
import { CommonModule } from '@angular/common';


/*Reference to Youtube tutorial for parallax effect: https://www.youtube.com/watch?v=kmM6mqvnxcs*/
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  user:any;
  courses:any|undefined;
  isLoggedIn:boolean=false;

  //viewchilds to reference elemts for parallax effect
  @ViewChild('text') text!: ElementRef;
  @ViewChild('book') book!: ElementRef;
  @ViewChild('parallax') parallax!: ElementRef;

  //Parallax scroll listener 
  @HostListener('window:scroll', [])
  onScroll() {
    const value = Math.min(window.scrollY, window.innerHeight);

    //applies dynamic translation to book and text
    this.book.nativeElement.style.transform =
      `translate(-50%, -50%) translateX(${-value * 2.9}px)`;

    this.text.nativeElement.style.transform =
      `translate(-50%, ${value * 2.5}px)`;
  }

  constructor(
    private authService:AuthService,
    private router:Router,
    private _course:CourseService,
    private change: ChangeDetectorRef){
    
  }

  
  
  ngOnInit(){
    //fetch course data from backend
    this.getCoursesdata()
    

    //checks if the users is logged in 
    this.authService.getUser().subscribe({
      next:(data)=>{
        console.log(data);
        //if the users is logged in, set the user data and update login status
        if(data.status==='Success'){
          this.isLoggedIn=true;
          this.user=data.data
          this.change.detectChanges();
        }
      },
      error:(err)=>{
        console.log(err);
        this.isLoggedIn=false;
        this.change.detectChanges();
      }
    })
  }

  //function to start a course, redirects to course page if logged in
  startCourse(courseId:String){
    if(this.isLoggedIn){
      this.router.navigate(['/course', courseId]);
    }else{
      this.router.navigate(['/login'])
    }
  }

  //fetch course data from backend
  getCoursesdata(){
    this._course.getCourses().subscribe({next:(res:any)=>{
      console.log(res);
      this.courses=res;//stores course data
      this.change.detectChanges();
    },error:(err)=>{
      console.log(err);
      this.change.detectChanges();
    }})
  }
  
}






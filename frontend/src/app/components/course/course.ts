import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../service/course-service/course-service';
import { AuthService } from '../../service/auth-service/auth-service';

@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class Course implements OnInit{
  courses:any []=[];
 constructor(private authService:AuthService, private router:Router, private _course:CourseService){
  this.getCoursesdata()

  }

  ngOnInit(){
  }
  

  getCoursesdata(){
    this._course.getCourses().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.courses=res;
    },error:(err)=>{
      console.log(err);
    }})
  }
}

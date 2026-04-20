import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../service/course-service/course-service';

@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterLink],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class Course implements OnInit{
  //stores list of all courses
  courses:any []=[];
  constructor(private courseService:CourseService,private change: ChangeDetectorRef ){
    
  }

  ngOnInit(){
    //load courses 
    this.getCoursesdata()
  }
  

  //fetch all courses from API
  getCoursesdata(){
    this.courseService.getCourses().subscribe({
      next:(res:any)=>{
        this.courses=res;
        console.log(this.courses);
        this.change.detectChanges();
    },error:(err)=>{
      console.log(err);
      this.change.detectChanges();
    }})
  }
}

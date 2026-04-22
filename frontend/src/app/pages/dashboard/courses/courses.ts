import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../service/course-service/course-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {

  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCoursesData();
  }

  // fetch all courses from API
  getCoursesData() {
    this.courseService.getCourses().subscribe({
      next: (res: any) => {
        this.courses = res.data || res; 
        console.log('raw data:',this.courses);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
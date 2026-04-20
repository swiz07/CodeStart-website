import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../service/course-service/course-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson',
  imports: [CommonModule],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
})
export class Lesson implements OnInit{
  lesson:any; //stores lesson data from the backend

  //ids from the route
  courseId: string | null = null;
  lessonId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    //gets courseid and lessonid from the route parameters
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.lessonId = this.route.snapshot.paramMap.get('lessonId');

    //log the parameters for debugging
    console.log('courseId:', this.courseId);
    console.log('lessonId:', this.lessonId);

  }

}

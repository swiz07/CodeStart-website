import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  //url for courses api
  private baseUrl="http://localhost:5000/api/courses"

  constructor( private http:HttpClient){
    
  }
  
  //fetches the list of all courses
  getCourses(){
    return this.http.get<any>(this.baseUrl);
  }

  //fetches a sinle course by its id 
  getCourseById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  //creates a new course
  createCourse(course: any) {
    return this.http.post(this.baseUrl, course);
  }

  //updates an existing course by its id
  updateCourse(id: string, course: any) {
    return this.http.put(`${this.baseUrl}/${id}`, course);
  }

  //deletes a course by id
  deleteCourse(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  //adds a lesson to a specific course by course id
  addLesson(courseId: string, lesson: any) {
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, lesson);
  }

  //adds a quiz to a specific course by course id
  addQuiz(courseId: string, quiz: any) {
    return this.http.post(`${this.baseUrl}/${courseId}/quizzes`, quiz);
  }
}

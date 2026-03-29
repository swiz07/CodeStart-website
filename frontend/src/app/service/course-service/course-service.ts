import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url="http://localhost:5000/api/"

  constructor( private http:HttpClient){
    
  }
  
  getCourses(){
    return this.http.get(this.url+"courses");
  }
}

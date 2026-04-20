import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseURL='http://localhost:5000/api/blogs';

  constructor(private http:HttpClient){
    
  }

  //fetch all blogs
  getAllBlogs():Observable<any>{
    return this.http.get<any>(this.baseURL);
  }

  //fetch blog by id
  getBlogById(id:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/${id}`);
  }

}

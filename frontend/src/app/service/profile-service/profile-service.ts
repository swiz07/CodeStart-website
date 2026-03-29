import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl='http://localhost:5000/api/profile'; //backend url

  constructor(private http: HttpClient) {
  }

  //get profile from backend
  getUser():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`, {withCredentials:true})
  }
  
  //method update the user profile
  updateProfile(profileData:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}`, profileData, {withCredentials:true});
  }
}

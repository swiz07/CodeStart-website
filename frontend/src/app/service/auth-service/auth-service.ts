import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:5000/api/auth'
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
    else {
      //fetch user from backend 
      this.getUser().subscribe()
    }
  }

  //gets users
  get currentUser() {
    return this.userSubject.value;
  }

  //calls this after login
  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user)) //login
  }

  //calls this after logout
  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('user')//clear on logout
  }


  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/signup`, user)
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user, { withCredentials: true }).pipe(
      tap((res: any) => {
        this.setUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user)) //set user on login
      })
    )
  };


  getUser(): Observable<any> {
    return this.http.get(
      `${this.baseURL}/user`,
      { withCredentials: true }
    ).pipe(
      tap((res: any) => this.setUser(res.data))//set user if token is valid
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseURL}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() =>
        this.clearUser()) //clear user on logout
    )
  }

}

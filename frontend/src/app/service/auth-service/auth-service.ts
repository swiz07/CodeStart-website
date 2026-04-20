import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseURL = 'http://localhost:5000/api/auth'; //base url for authenication api

  //behaviorSubject is used to hold the current user's state and notify about changes
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    //check if there is saved user in local storage
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      //if there is a saved user, load it into behaviorSubject
      this.userSubject.next(JSON.parse(savedUser));
    } else {
      //if no user, try to fetch the user from the server
      
      if(document.cookie.includes('token=')){
        this.loadUserFromServer();
      }
    }
  }

  //getter to get the current user
  get currentUser() {
    return this.userSubject.value;
  }

  //setter to set the user in BehaviorSubject and localstorage
  setUser(user: any) {
    this.userSubject.next(user); //sets user to behaviorsubject
    localStorage.setItem('user', JSON.stringify(user)); //save user in localstorage
  }

  //clears the user from localstorage and behaviorsubject
  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  //loads the user data from the server
  private loadUserFromServer() {
    this.getUser().subscribe({
      next: (res: any) => {
        if (res?.data) {
          this.setUser(res.data);
        }
      },
      error: () => {
        this.clearUser(); 
      }
    });
  }

  //signup method to register a new user
  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/signup`, user); 
  }

  //login method to authenicate the user
  login(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          this.setUser(res.user);
        })
      );
  }

  //get the current user from the server
  getUser(): Observable<any> {
    return this.http.get(`${this.baseURL}/user`, { withCredentials: true })
      .pipe(
        catchError(() => of(null)) 
      );
  }

  //logout method to logout the user
  logout(): Observable<any> {
    return this.http.post(`${this.baseURL}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.clearUser())
      );
  }
}
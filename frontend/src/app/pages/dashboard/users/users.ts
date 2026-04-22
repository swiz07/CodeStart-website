import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  user$!: Observable<any>;
  
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}

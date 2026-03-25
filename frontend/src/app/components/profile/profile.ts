import { Component, OnInit } from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../service/profile-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  standalone:true,
  styleUrl: './profile.scss',
})
export class Profile implements OnInit{
  user$:Observable<any>=new Observable(); //initialise as empty
  editMode:boolean=false;
  updatedUser:any={};
  defaultImage='https://img.icons8.com/?size=100&id=84898&format=png&color=ffffff';
  

  constructor(private profileService:ProfileService){
  }
  ngOnInit(): void {
    this.user$=this.profileService.getUser().pipe(
      map(res=>res.data)
    )

    this.user$.subscribe(user=>{
      console.log('Received user data:', user)
    })
    
  }

  //edit method for edit btn
  onEditProfile(){
    this.editMode=true;
    //uses profileService to get user profile data
    this.user$.pipe(take(1)).subscribe(user=>{
      this.updatedUser={...user};
    })
  }

  //cancel method
  onCancelEdit(){
    this.editMode=false;
  }

  //saves data and reloads profile
  onSaveProfile(){
    console.log(this.updatedUser)
    if(!this.updatedUser.full_name || !this.updatedUser.email || !this.updatedUser.bio){
      console.log("All info are required");
      return;
    }

    this.profileService.updateProfile(this.updatedUser).subscribe(
      (response)=>{
        console.log('Profile updated', response)
        this.editMode=false;

        window.location.reload()
        
      },
      (error)=>{
        console.error('Error updating profile', error)
      }
    )
  }
}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './components/home/home';
import { ContactUs } from './components/contact-us/contact-us';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Course } from './components/course/course';
import { Blog } from './components/blog/blog';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: Home },
  {path:'contact', component: ContactUs },
  {path:'login', component:Login},
  {path:'signup', component:Signup},
  {path:'course', component:Course},//protected
  {path:'blog', component:Blog},
  {path:'profile', component:Profile, canActivate:[authGuard]},//protected
  {path:"**", redirectTo:'login'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }

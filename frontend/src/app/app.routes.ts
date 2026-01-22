import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './components/home/home';
import { ContactUs } from './components/contact-us/contact-us';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Course } from './components/course/course';
import { Blog } from './components/blog/blog';

export const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: Home },
  {path:'contact', component: ContactUs },
  {path:'login', component:Login},
  {path:'signup', component:Signup},
  {path:'course', component:Course},
  {path:'blog', component:Blog}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }

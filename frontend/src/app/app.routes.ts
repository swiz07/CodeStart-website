import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './pages/home/home';
import { ContactUs } from './pages/contact-us/contact-us';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Course } from './pages/course-preview/course';
import { BlogPreview } from './pages/blog-preview/blog-preview';
import { Profile } from './pages/profile/profile';
import { authGuard } from './guards/auth-guard';
import { CourseDetail } from './pages/course-detail/course-detail';
import { Dashboard } from './pages/dashboard/dashboard';
import { Lesson } from './pages/lesson/lesson';
import { BlogDetail } from './pages/blog-detail/blog-detail';
import { Users } from './pages/dashboard/users/users';
import { Courses } from './pages/dashboard/courses/courses';

export const routes: Routes = [
  // Redirect to home on empty path
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Course detail route
  { path: 'course/:courseId/lesson/:lessonId', component: Lesson },

  // The course preview route
  { path: 'course', component: Course },

  // Dynamic course detail route
  { path: 'course/:id', component: CourseDetail },

  // Other static routes
  { path: 'home', component: Home },
  { path: 'contact', component: ContactUs },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'blog', component:BlogPreview }, //blog preview list
  { path: 'blog/:id', component:BlogDetail}, 

  // Protected route, use authGuard for authentication check
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'dashboard/users', component: Users, canActivate: [authGuard] },
  { path: 'dashboard/courses', component: Courses, canActivate: [authGuard] },

  // Wildcard route 
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
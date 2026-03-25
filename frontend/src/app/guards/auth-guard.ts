import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService);
  const router=inject(Router);

  if(auth.currentUser){ //checks if user exists
    return true;
    console.log(auth.currentUser)
  }else{
    router.navigate(['/login']); //redirects if not logged in
    return false;
  }
  return true;
};

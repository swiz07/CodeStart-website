import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service/auth-service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    map(user => {
      if (user) {
        return true; //alows access if logged in
      } else {
        router.navigate(['/login']); //redirect if not logged in
        return false;
      }
    })
  );
};
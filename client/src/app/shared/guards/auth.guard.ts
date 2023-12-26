import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  const router = inject(Router)

  authenticationService.getLoggedIn().subscribe({
    next: (isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['/home'])
        return false;
      }
      return true;
    },
    error: (error) => {
      console.error(error)
      router.navigate(['/home'])
      return false;
    }
  })
  return true;
};
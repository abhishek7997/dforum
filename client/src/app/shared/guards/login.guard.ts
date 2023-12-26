import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  const router = inject(Router)

  return authenticationService.getUserId().pipe(map(userId => {
    if (userId)
      return true;
    router.navigate(['home'])
    return false;
  }), catchError(error => {
    router.navigate(['home'])
    return of(false)
  }))
};
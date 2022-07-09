import { map, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad
} from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable({ providedIn: "root" })
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      tap(value => {
        if (!value) {
          this.router.navigate(['']);
        }
      })
    )
  }
}

@Injectable({ providedIn: "root" })
export class OnlyLoggedOutUsersGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      tap(value => {
        if (value) {
          this.router.navigate(['dashboard']);
        }
      }),
      map(value => !value)
    )
  }
}
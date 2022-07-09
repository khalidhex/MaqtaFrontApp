import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(!localStorage.getItem("access_token"));
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {

  }

  login(formValue: any) {
    return this.http.post<any>("https://localhost:7085/api/Authenticate/login", formValue)
      .pipe(
        tap(res => {
          this._isLoggedIn.next(true);
          localStorage.setItem('access_token', res.token)

        })
      );

  }
}

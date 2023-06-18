import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { User } from 'src/app/home/login/types/UserLoginDetails';
import { UserLoginResponse } from 'src/app/home/login/types/UserLoginResponse';
import { CookieService } from 'ngx-cookie-service';
import { UserDetails } from 'src/app/home/user-page/types/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = "http://localhost:8080/api/v1"
  token: string | null = null;
  userId: number | null = null;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
    this.getUserId()
  }

  register(user: User): Observable<UserLoginResponse> {
    let response: Observable<UserLoginResponse> = this.httpClient.post<UserLoginResponse>(`${this.baseUrl}/auth/register`, { ...user }, { withCredentials: true })
    response.subscribe({
      next: (data) => {
        this.token = data.token!;
        // this.setLoggedIn(true);
        if (this.token) {
          this.cookieService.set('jwt', this.token, { sameSite: 'Lax' });
        }
        this.getUserId()
      },
      error: (error) => console.error(error)
    })
    return response
  }

  login(user: User): Observable<UserLoginResponse> {
    let response: Observable<UserLoginResponse> = this.httpClient.post<UserLoginResponse>(`${this.baseUrl}/auth/authenticate`, user, { withCredentials: true })
    response.subscribe({
      next: (data) => {
        this.token = data.token!;
        this.setLoggedIn(true);
        if (this.token) {
          this.cookieService.set('jwt', this.token, { sameSite: 'Lax' });
        }
        this.getUserId()
      },
      error: (error) => console.error(error)
    })

    return response
  }

  logout() {
    let response: Observable<Object> = this.httpClient.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true });
    response.subscribe({
      next: (_) => {
        this.token = null
        this.setLoggedIn(false);
        this.cookieService.delete('jwt')
        this.userId = null
      }, error: (error) => console.error(error)
    })
    return response;
  }

  getUserId(): Observable<number | null> {
    let response = this.httpClient.get<number>(`${this.baseUrl}/users/currentUserId`, { withCredentials: true })
    response.subscribe({
      next: (data) => {
        this.setLoggedIn(true)
      },
      error: (error) => { this.setLoggedIn(false); console.error(error) }
    })
    return response;
  }

  getUserDetails(userId: number): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(`${this.baseUrl}/users/user/${userId}`);
  }

  setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn.next(loggedIn);
  }

  getLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  setToken(token: string) {
    this.token = token;
  }
}

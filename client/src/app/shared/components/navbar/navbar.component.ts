import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  isLoggedIn: boolean = false;
  private isLoggedInSubscription!: Subscription;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authenticationService.getLoggedIn().subscribe((loggedIn) => { this.isLoggedIn = loggedIn; });
    this.authenticationService.getUserId().subscribe({
      next: (data) => this.userId = data,
      error: (error) => console.error(error)
    })
  }

  logout() {
    this.authenticationService.logout();
    this.authenticationService.setLoggedIn(false)
    this.redirectTo()
  }

  redirectTo() {
    this.router.navigate(["/home"])
  }
}

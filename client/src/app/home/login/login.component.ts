import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './types/UserLoginDetails';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup
  user: User = new User();
  isLoggedIn: boolean = false;
  private isLoggedInSubscription!: Subscription;

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authenticationService.getLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  onSubmit() {
    var val = this.form.value;
    if (val.username && val.password) {
      this.user.username = val.username
      this.user.password = val.password
      this.login()
    }
  }

  login() {
    this.authenticationService.login(this.user).subscribe({
      next: (_) => this.redirectTo(),
      error: (error) => console.error(error)
    })
  }

  redirectTo() {
    this.router.navigate(["/home"])
  }

}

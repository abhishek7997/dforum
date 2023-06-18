import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { User } from '../login/types/UserLoginDetails';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  user: User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    var val = this.form.value;
    if (val.username && val.password && val.email) {
      this.register({ username: val.username, email: val.email, password: val.password })
    }
  }

  register(userDetails: any) {
    this.authenticationService.register(userDetails).subscribe({
      next: (_) => this.redirectTo(),
      error: (error) => console.error(error)
    })
  }

  redirectTo() {
    this.router.navigate(["/home"])
  }
}

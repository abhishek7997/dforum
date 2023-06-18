import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../shared/guards/auth.guard';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { ThreadCreateComponent } from './thread-create/thread-create.component';
import { loginGuard } from '../shared/guards/login.guard';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [authGuard] },
  { path: "register", component: RegisterComponent, canActivate: [authGuard] },
  {
    path: "thread", children: [
      { path: "create", component: ThreadCreateComponent, canActivate: [loginGuard] },
      { path: ":threadId", component: ThreadPageComponent },
      { path: "update/:threadId", component: ThreadEditComponent, canActivate: [loginGuard] }
    ]
  },
  {
    path: "user", children: [
      { path: ":userId", component: UserPageComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
})
export class HomeRoutingModule { }

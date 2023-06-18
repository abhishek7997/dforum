import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module'
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { httpInterceptorProviders } from '../shared/interceptors/auth-interceptor.interceptor';
import { ThreadsListComponent } from './threads-list/threads-list.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { DatePipe } from '@angular/common';
import { ThreadPageComponent } from './thread-page/thread-page.component';
import { PostComponent } from './post/post.component';
import { ThreadCreateComponent } from './thread-create/thread-create.component';
import { NgxEditorModule } from 'ngx-editor';
import { AuthenticationService } from '../shared/service/authentication.service';
import { ThreadEditComponent } from './thread-edit/thread-edit.component';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    ThreadsListComponent,
    ThreadPageComponent,
    PostComponent,
    ThreadCreateComponent,
    ThreadEditComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxEditorModule
  ], exports: [
    HomePageComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    httpInterceptorProviders,
    CookieService,
    DatePipe,
    AuthenticationService
  ]
})
export class HomeModule { }

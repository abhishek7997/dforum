import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { PostService } from 'src/app/shared/service/post.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { UserDetails } from './types/UserDetails';
import { DatePipe } from '@angular/common';
import { ThreadsPaginated } from '../threads-list/types/ThreadsPaginated';
import { PostsPaginated } from '../post/types/PostsPaginated';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userId!: number;
  userDetails!: UserDetails;
  userPosts!: PostsPaginated;
  userThreads!: ThreadsPaginated;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService, private postService: PostService, private threadService: ThreadService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    try {
      this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId') || '')
      if (this.userId)
        this.authenticationService.getUserDetails(this.userId).subscribe({
          next: (data) => this.userDetails = data,
          error: (error) => console.error(error)
        })
      this.getUserThreads()
      this.getUserPosts()
    } catch (e) {
      this.router.navigate(['home'])
    }
  }

  getUserThreads() {
    if (this.userId) {
      this.threadService.getThreadsByUserId(this.userId).subscribe({
        next: (data) => this.userThreads = data,
        error: (error) => console.error(error)
      })
    }
  }

  getUserPosts() {
    if (this.userId) {
      this.postService.getPostsByUserId(this.userId).subscribe({
        next: (data) => this.userPosts = data,
        error: (error) => console.error(error)
      })
    }
  }

  convertISOToReadableDate(dateString: Date): string | null {
    return this.datePipe.transform(dateString.toString(), 'medium');
  }
}

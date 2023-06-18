import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from './types/Thread';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { PostService } from 'src/app/shared/service/post.service';
import { Post } from '../post/types/Post';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Validators } from 'ngx-editor';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {
  threadId: number | null = null;
  thread!: Thread;
  posts: Post[] = [];
  isCreatingPost: boolean = false;
  isOwn: boolean = false;

  form!: FormGroup;
  editor: Editor = new Editor();

  constructor(private activatedRoute: ActivatedRoute, private threadService: ThreadService, private router: Router, private postService: PostService, private datePipe: DatePipe, private authenticationService: AuthenticationService) {
    this.form = new FormGroup({
      editorContent: new FormControl(null, [Validators.required()]),
    });
  }

  ngOnInit(): void {
    this.threadId = parseInt(this.activatedRoute.snapshot.paramMap.get('threadId') || '')
    this.getThread()
    this.getPostsyThreadId()
  }

  getThread() {
    if (this.threadId)
      this.threadService.getThreadById(this.threadId).subscribe({
        next: (data) => {
          this.thread = data;
          this.authenticationService.getUserId().subscribe({
            next: (userId) => {
              if (userId && userId === this.thread.userId)
                this.isOwn = true
            }, error: (error) => {
              console.error(error)
              this.isOwn = false
            }
          })
        },
        error: (error) => { console.error(error); this.router.navigate(['/home']) }
      })
  }

  getPostsyThreadId() {
    if (this.threadId)
      this.postService.getPostsByThreadId(this.threadId).subscribe({
        next: (data) => this.posts = data,
        error: (error) => console.error(error)
      })
  }

  convertISOToReadableDate(dateString: Date): string | null {
    return this.datePipe.transform(dateString.toString(), 'medium');
  }

  onSubmit() {
    let val = this.form.value;
    if (val.editorContent) {
      this.createPost(val.editorContent)
    }
  }

  createPost(postBody: object) {
    this.postService.createPost(this.threadId!, postBody).subscribe({
      next: (data: Post) => {
        this.posts.unshift(data)
        this.isCreatingPost = false
        this.editor = new Editor()
        this.router.navigate(['thread/', data.threadId]);
      },
      error: (error) => {
        this.router.navigate(['home'])
      }
    })
  }

  toggleVisibility() {
    this.isCreatingPost = !this.isCreatingPost
  }

  deleteThread() {
    if (this.threadId)
      this.threadService.deleteThread(this.threadId).subscribe({
        next: (_) => {
          this.router.navigate(['home'])
        }, error: (error) => console.error(error)
      })
  }

  updateThread() {
    if (this.threadId) {
      this.router.navigate(['thread', 'update', this.threadId], { state: { thread: this.thread } })
    }
  }
}

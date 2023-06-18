import { Component, Input } from '@angular/core';
import { Post } from './types/Post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input()
  post!: Post;

  constructor(private datePipe: DatePipe) { }

  convertISOToReadableDate(dateString: Date): string | null {
    return this.datePipe.transform(dateString.toString(), 'medium');
  }
}

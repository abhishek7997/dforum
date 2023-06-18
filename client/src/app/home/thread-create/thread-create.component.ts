import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Editor, Validators } from 'ngx-editor';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { CreateThreadResponse } from './types/CreateThreadResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thread-create',
  templateUrl: './thread-create.component.html',
  styleUrls: ['./thread-create.component.css']
})
export class ThreadCreateComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  editor!: Editor;

  constructor(private threadService: ThreadService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required()),
      editorContent: new FormControl(null, [Validators.required()]),
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    let val = this.form.value;
    if (val.title && val.editorContent) {
      this.createThread(val.title, val.editorContent)
    }
  }

  createThread(title: string, editorContent: object) {
    this.threadService.createThread(title, editorContent).subscribe({
      next: (data: CreateThreadResponse) => {
        this.router.navigate(['thread/', data.threadId]);
      },
      error: (error) => {
        this.router.navigate(['home'])
      }
    })
  }
}

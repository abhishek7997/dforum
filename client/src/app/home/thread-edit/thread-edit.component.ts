import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Validators } from 'ngx-editor';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { CreateThreadResponse } from '../thread-create/types/CreateThreadResponse';
import { Thread } from '../thread-page/types/Thread';

@Component({
  selector: 'app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrls: ['./thread-edit.component.css']
})
export class ThreadEditComponent {
  form!: FormGroup;
  editor!: Editor;
  threadId?: number;
  thread: Thread | null = null;

  constructor(private threadService: ThreadService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required()),
      editorContent: new FormControl(null, [Validators.required()]),
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.thread = history.state.thread
    this.threadId = this.thread?.threadId
    this.form.get('title')?.setValue(this.thread?.title)
    this.form.get('editorContent')?.setValue(this.thread?.content)
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    let val = this.form.value;
    if (val.title && val.editorContent && this.threadId) {
      this.updateThread(this.threadId, val.title, val.editorContent)
    }
  }

  updateThread(threadId: number, title: string, editorContent: object) {
    this.threadService.updateThread(threadId, title, editorContent).subscribe({
      next: (data: CreateThreadResponse) => {
        this.router.navigate(['thread/', data.threadId]);
      },
      error: (error) => {
        this.router.navigate(['home'])
      }
    })
  }
}

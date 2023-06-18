import { Component, Input, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { ThreadsPaginated } from './types/ThreadsPaginated';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.css']
})
export class ThreadsListComponent implements OnInit {
  @Input()
  threads: ThreadsPaginated | null = null;
  page: number = 0;
  pageSize: number = 10;

  constructor(private threadService: ThreadService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getThreads()
  }

  getThreads() {
    this.threadService.getThreads(this.page, this.pageSize).subscribe({
      next: (data) => this.threads = data,
      error: (error) => console.error(error)
    })
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.getThreads();
  }

  convertISOToReadableDate(dateString: Date): string | null {
    return this.datePipe.transform(dateString.toString(), 'medium');
  }
}

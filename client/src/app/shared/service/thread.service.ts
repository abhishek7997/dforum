import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateThreadResponse } from 'src/app/home/thread-create/types/CreateThreadResponse';
import { Thread } from 'src/app/home/thread-page/types/Thread';
import { ThreadsPaginated } from 'src/app/home/threads-list/types/ThreadsPaginated';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private baseUrl: string = "http://localhost:8080/api/v1"

  constructor(private httpClient: HttpClient) { }

  getThreads(page: number, pageSize: number): Observable<ThreadsPaginated> {
    const queryParams = { "page": page, "pageSize": pageSize }
    return this.httpClient.get<ThreadsPaginated>(`${this.baseUrl}/threads/threads`, { params: queryParams })
  }

  getThreadById(threadId: number): Observable<Thread> {
    return this.httpClient.get<Thread>(`${this.baseUrl}/threads/getThreadById/${threadId}`)
  }

  getThreadsByUserId(userId: number): Observable<ThreadsPaginated> {
    return this.httpClient.get<ThreadsPaginated>(`${this.baseUrl}/threads/getThreadsByUserId/${userId}`)
  }

  createThread(title: string, content: object): Observable<CreateThreadResponse> {
    return this.httpClient.post<CreateThreadResponse>(`${this.baseUrl}/threads/create`, { title, content }, { withCredentials: true })
  }

  updateThread(threadId: number, title: string, content: object): Observable<CreateThreadResponse> {
    return this.httpClient.put<CreateThreadResponse>(`${this.baseUrl}/threads/update/${threadId}`, { title, content }, { withCredentials: true })
  }

  deleteThread(threadId: number) {
    return this.httpClient.delete<any>(`${this.baseUrl}/threads/delete/${threadId}`, { withCredentials: true })
  }
}

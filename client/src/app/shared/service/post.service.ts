import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/home/post/types/Post';
import { PostsPaginated } from 'src/app/home/post/types/PostsPaginated';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = "http://localhost:8080/api/v1"
  constructor(private httpClient: HttpClient) { }

  getPostsByThreadId(threadId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/posts/getPostsByThreadId/${threadId}`)
  }

  getPostsByUserId(userId: number): Observable<PostsPaginated> {
    return this.httpClient.get<PostsPaginated>(`${this.baseUrl}/posts/getPostsByUserId/${userId}`)
  }

  createPost(threadId: number, postBody: object): Observable<Post> {
    return this.httpClient.post<Post>(`${this.baseUrl}/posts/create`, { threadId, postBody }, { withCredentials: true })
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, zip} from "rxjs";
import {BlogInfo} from "../common/dto.common";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BlogsService {
  public blogs$ = new BehaviorSubject<Array<BlogInfo>>([]);

  constructor(private http: HttpClient) {}

  getBlogs(): void {
    this.http.get<Array<BlogInfo>>(`${environment.baseApiUrl}blogs`)
      .subscribe(blogs => this.blogs$.next(blogs));
  }

  deleteBlog(id: string): void {
    const deletedBlog = this.http.delete<{id: string}>(`${environment.baseApiUrl}blogs/${id}`);
    zip(deletedBlog, this.blogs$).pipe(
      map(([deleted, blogs]) => this.blogs$.next(blogs.filter(blog => blog.id !== deleted.id)))
    ).subscribe();
  }
}

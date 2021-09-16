import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BlogCredentials, BlogInfo} from "../common/dto.common";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlog(blogId: string): Observable<BlogInfo> {
    return this.http.get<BlogInfo>(`${environment.baseApiUrl}blogs/${blogId}`);
  }

  createBlog(blogForm: BlogCredentials): Observable<BlogInfo> {
    const {blog, imageUrl, title} = blogForm;
    const formData = new FormData();
    formData.append("blog", blog);
    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    return this.http.post<BlogInfo>(`${environment.baseApiUrl}blogs`, formData);
  }

  updateBlog(blogForm: BlogCredentials): Observable<BlogInfo> {
    const {id, blog, imageUrl, title} = blogForm;
    const formData = new FormData();
    formData.append("blog", blog);
    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    return this.http.put<BlogInfo>(`${environment.baseApiUrl}blogs/${id}`, formData);
  }
}

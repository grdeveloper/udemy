import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BlogInfo} from "./dto.common";
import {BlogService} from "../services/blog.service";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class BlogResolver implements Resolve<BlogInfo> {
  constructor(private blogService: BlogService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BlogInfo> {
    return this.blogService.getBlog(route.paramMap.get("blogId")!);
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs";
import {BlogInfo, User} from '../../common/dto.common';
import {BlogsService} from "../../services/blogs.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  public user$: BehaviorSubject<User | null> = this.authService.appUser$;
  public blogs$: Observable<Array<BlogInfo>> = this.blogsService.blogs$;

  constructor(
    private authService: AuthService,
    private blogsService: BlogsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogsService.getBlogs();
  }

  addNewBlog(): void {
    this.router.navigate(["new"], {relativeTo: this.activatedRoute});
  }

  editBlog(blogId: {id: string}): void {
    this.router.navigate([blogId.id], {relativeTo: this.activatedRoute});
  }

  deleteBlog(blogId: {id: string}): void {
    this.blogsService.deleteBlog(blogId.id);
  }
}

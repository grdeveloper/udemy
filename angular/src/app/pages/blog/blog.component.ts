import { Component, OnInit } from '@angular/core';
import {BlogCredentials, User} from "../../common/dto.common";
import {BlogService} from "../../services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {BehaviorSubject, zip} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public user$: BehaviorSubject<User | null> = this.authService.appUser$;
  public blog$ = this.route.data.pipe(
    map(data => data.blog)
  );
  public disabled$ = zip(this.user$, this.blog$).pipe(
    map(([user, blog]) => blog && blog.userId !== user?.id)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {}

  onCreateBlog(blogForm: BlogCredentials): void {
    this.blogService.createBlog(blogForm)
      .subscribe(() => this.router.navigate(["blogs"]));
  }

  onUpdateBlog(blogForm: BlogCredentials): void {
    this.blogService.updateBlog(blogForm)
      .subscribe(() => this.router.navigate(["blogs"]));
  }
}

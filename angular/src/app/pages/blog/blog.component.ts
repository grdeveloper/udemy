import { Component, OnInit } from '@angular/core';
import {Blog} from "../../common/dto.common";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  onCreateBlog(blogForm: Blog): void {
    console.log('form created =====>', blogForm);
  }

  onUpdateBlog(blogForm: Blog): void {
    console.log('form updated =====>', blogForm);
  }
}

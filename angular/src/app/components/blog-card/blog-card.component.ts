import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogInfo} from '../../common/dto.common';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styles: [
  ]
})
export class BlogCardComponent implements OnInit {
  @Input() blog: BlogInfo = {} as BlogInfo;
  @Input() isBlogAuthor: boolean = false;

  @Output() editBlog = new EventEmitter<{id: string}>();
  @Output() deleteBlog = new EventEmitter<{id: string}>();

  public fileUrl: string = environment.baseFileUrl;

  constructor() { }

  ngOnInit(): void {}

  onBlogEdit(): void {
    this.editBlog.emit({id: this.blog.id!});
  }

  onBlogDelete(): void {
    this.deleteBlog.emit({id: this.blog.id!});
  }
}

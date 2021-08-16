import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogInfo} from '../../common/dto.common';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styles: [
  ]
})
export class BlogCardComponent implements OnInit {
  @Input() blog: BlogInfo = {} as BlogInfo;

  @Output() editBlog = new EventEmitter<{id: string}>();
  @Output() deleteBlog = new EventEmitter<{id: string}>();

  constructor() { }

  ngOnInit(): void {}

  onBlogEdit(): void {
    this.editBlog.emit({id: this.blog.id});
  }

  onBlogDelete(): void {
    this.editBlog.emit({id: this.blog.id});
  }
}

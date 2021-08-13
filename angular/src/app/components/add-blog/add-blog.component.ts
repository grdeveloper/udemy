import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styles: [
  ]
})
export class AddBlogComponent implements OnInit {
  @Output() addNewBlog = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {}

  onAddNewBlog(): void {
    this.addNewBlog.emit();
  }
}

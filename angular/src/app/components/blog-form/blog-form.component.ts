import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogCredentials, BlogInfo} from "../../common/dto.common";

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: [
  ]
})
export class BlogFormComponent implements OnInit {
  @Input() blog: BlogInfo | null = null;
  @Input() disabled: boolean = false;

  @Output() createBlog = new EventEmitter<BlogCredentials>();
  @Output() updateBlog = new EventEmitter<BlogCredentials>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      blog: ["", Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.blog) {
      this.form.patchValue({
        title: this.blog?.title,
        blog: this.blog?.blog,
        imageUrl: this.blog?.imageUrl
      });
    }
    if (this.disabled) {
      this.form.controls['title'].disable();
      this.form.controls['blog'].disable();
    }
  }

  submitForm(): void {
    if (!this.form.valid) {
      return;
    }

    const {title, blog, imageUrl} = this.form.value;
    if (this.blog) {
      return this.updateBlog.emit(new BlogCredentials(title, blog, imageUrl, this.blog.id));
    }

     return this.createBlog.emit(new BlogCredentials(title, blog, imageUrl));
  }
}

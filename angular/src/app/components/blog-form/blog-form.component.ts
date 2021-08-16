import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Blog} from "../../common/dto.common";

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styles: [
  ]
})
export class BlogFormComponent implements OnInit {
  @Output() createBlog = new EventEmitter<Blog>();
  @Output() updateBlog = new EventEmitter<Blog>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      blog: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    this.form.valid && this.createBlog.emit(this.form.value);
    this.form.valid && this.updateBlog.emit(this.form.value);
  }
}

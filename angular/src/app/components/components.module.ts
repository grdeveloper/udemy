import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { ProcessImageComponent } from './process-image/process-image.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    AddBlogComponent,
    BlogCardComponent,
    ProcessImageComponent,
  ],
  exports: [
    FlexLayoutModule,
    SignupComponent,
    SigninComponent,
    AddBlogComponent,
    BlogCardComponent,
    ProcessImageComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ComponentsModule { }

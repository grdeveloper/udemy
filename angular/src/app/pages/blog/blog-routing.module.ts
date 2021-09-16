import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import {BlogResolver} from "../../common/blogresolver.common";

const routes: Routes = [
  { path: 'new', pathMatch: 'full', component: BlogComponent },
  { path: ':blogId', pathMatch: 'full', component: BlogComponent, resolve: {blog: BlogResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

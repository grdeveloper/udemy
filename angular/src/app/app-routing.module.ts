import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {AuthGuard} from "./common/authguard.common";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'blogs',
    component: HeaderComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canLoad: [AuthGuard],
        loadChildren: () => import('./pages/blogs/blogs.module').then(m => m.BlogsModule)
      },
      {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'blogs'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

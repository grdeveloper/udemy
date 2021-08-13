import { Component, OnInit } from '@angular/core';
import {Blog} from '../../common/dto.common';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Array<Blog> = [
    {
      id: '1',
      title: 'title 1',
      blog: 'Lorem kjhdf ksjhdfkjdshfkjsdhf kjs dhfkjhsdk jfhskjf hksjhf k sdkjfh skdjhf jsd fhkjsdhf ksjhf jshdf kjhskdj fh',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
      user: {
        id: '1',
        username: 'John'
      }
    },
    {
      id: '2',
      title: 'title 2',
      blog: 'blog 2 sjdhfkjsh fkjdshfk jsdhf kjdshf kjdshf kjdshf kjjkshdf kjs fhkdjshfkjs dhfkjdshfkjsd fkjhssdhf kjdsh fkjd shfkjs hdfkjhf',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
      user: {
        id: '2',
        username: 'Kevin'
      }
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  addNewBlog(): void {
    console.log('new');
  }

  editBlog(blog: {id: string}): void {
    console.log(blog);
  }

  deleteBlog(blog: {id: string}): void {
    console.log(blog);
  }
}

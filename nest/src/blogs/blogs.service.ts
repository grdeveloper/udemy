import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from 'fs';

import { Blog } from "./blog.entity";
import { User } from "../user/user.entity";
import { BlogRepository } from "./blog.repository";
import { CreateBlogDto } from "./dto/create-blog.dto";

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository
  ) {}

  getBlogs(): Promise<Array<Blog>> {
    return this.blogRepository.getBlogs();
  }

  async getBlog(blogId: string): Promise<Blog> {
    const blogFound = await this.blogRepository.findOne(blogId);

    if (!blogFound) {
      throw new NotFoundException();
    }

    return blogFound;
  }

  async createBlog(createBlogDto: CreateBlogDto, user: User): Promise<Blog> {
    return this.blogRepository.createBlog(createBlogDto, user);
  }

  async updateBlog(
    blogId: string,
    title: string,
    blog: string,
    imageUrl: string,
    user: User
  ): Promise<Blog> {
    const blogFound = await this.blogRepository.findOne({ where: { id: blogId, userId: user.id } });

    if (!blogFound) {
      throw new NotFoundException();
    }

    blogFound.title = title;
    blogFound.blog = blog;
    imageUrl && (blogFound.imageUrl = imageUrl);
    await blogFound.save();
    return blogFound;
  }

  async deleteBlog(blogId: string, user: User): Promise<{id: string}> {
    const blogFound = await this.blogRepository.findOne({ where: { id: blogId, userId: user.id } });
    const result = await this.blogRepository.delete(blogFound);

    fs.unlink(`./uploads/${blogFound.imageUrl}`, err => console.log(err));

    if (!result.affected) {
      throw new NotFoundException();
    }

    return {id: blogFound.id};
  }
}

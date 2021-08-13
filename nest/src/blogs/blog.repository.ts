import { EntityRepository, Repository } from "typeorm";

import { Blog } from "./blog.entity";
import { User } from "../user/user.entity";
import { CreateBlogDto } from "./dto/create-blog.dto";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async getBlogs(): Promise<Array<Blog>> {
    return await this
        .createQueryBuilder("blog")
        .leftJoinAndSelect("blog.user", "user")
        .getMany();
  }

  async createBlog({ title, blog, imageUrl }: CreateBlogDto, user: User): Promise<Blog> {
    const newBlog = new Blog();
    newBlog.title = title;
    newBlog.blog = blog;
    newBlog.imageUrl = imageUrl;
    newBlog.user = user;
    await newBlog.save();
    return newBlog;
  }
}

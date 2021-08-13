import { Body, Controller, Get, Post, Param, Delete, Put, UseGuards, Req, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

import { Blog } from "./blog.entity";
import { BlogsService } from "./blogs.service";
import { User } from "../user/user.entity";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

@Controller("blogs")
@UseGuards(AuthGuard())
@UseInterceptors(
    FileInterceptor('imageUrl',  {
      storage: diskStorage({
        destination: './uploads/',
        filename: (request: Request, file: Express.Multer.File, cb: Function) => {
          if (!file) {
            return;
          }

          return cb(null, file.originalname);
        }
      }),
    }),
)
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getBlogs(): Promise<Array<Blog>> {
    return this.blogsService.getBlogs();
  }

  @Get("/:blogId")
  getBlog(@Param("blogId") blogId: string): Promise<Blog> {
    return this.blogsService.getBlog(blogId);
  }

  @Post()
  createBlog(
      @UploadedFile() file,
      @Body("title") title: string,
      @Body("blog") blog: string,
      @Req() request: Request
  ): Promise<Blog> {
    return this.blogsService.createBlog({title, blog, imageUrl: file?.filename || ""}, request.user);
  }

  @Put("/:blogId")
  updateBlog(
    @UploadedFile() file,
    @Param("blogId") blogId: string,
    @Body("title") title: string,
    @Body("blog") blog: string,
    @Req() request: Request
  ): Promise<Blog> {
    return this.blogsService.updateBlog(blogId, title, blog, file?.filename || "", request.user);
  }

  @Delete("/:blogId")
  deleteBlog(@Param("blogId") blogId: string, @Req() request: Request): Promise<{id: string}> {
    return this.blogsService.deleteBlog(blogId, request.user);
  }
}

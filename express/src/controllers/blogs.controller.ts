import {NextFunction, Request, Response, Express} from "express";
import * as fs from "fs";

import {Blog} from "../models";

export const readBlogsController = async (request: Request, response: Response) => {
  const blogs = await Blog.find().populate('user').sort({createdAt: 'desc'});
  response.status(200).send(blogs);
};

export const readBlogController = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findOne({_id: request.params.blogId}).populate('user');
    if (!blog) {
      return next();
    }

    response.status(200).send(blog);
  } catch(err) {
    next();
  }
};

export const createBlogController = async (request: Request, response: Response) => {
  const {title, blog} = request.body;
  const newBlog = Blog.createBlog({
    title,
    blog,
    imageUrl: (request?.file as Express.Multer.File)?.filename || "",
    user: request.user.id
  });

  await newBlog.save();
  response.status(201).send([{message: 'Created successfully'}]);
};

export const updateBlogController = async (request: Request, response: Response, next: NextFunction) => {
  const {blogId} = request.params;
  const {title, blog} = request.body;
  const filename = (request?.file as Express.Multer.File)?.filename || "";

  try {
    const blogFound = await Blog.findOneAndUpdate(
      {_id: blogId, user: request.user.id},
      {title, blog, imageUrl: filename}
      );
    console.log(blogFound);
    if (!blogFound) {
      return next();
    }

    response.status(200).send([{message: 'Updated successfully'}]);
  } catch(err) {
    next();
  }
};

export const deleteBlogController = async (request: Request, response: Response, next: NextFunction) => {
  const {blogId} = request.params;

  try {
    const blogFound = await Blog.findOne({_id: blogId, user: request.user.id});

    if (!blogFound) {
      return next();
    }

    fs.unlink(`./uploads/${blogFound.imageUrl}`, err => console.log(err));
    await Blog.findByIdAndDelete({_id: blogId});

    response.status(200).send({id: blogFound.id});
  } catch(err) {
    next();
  }
};

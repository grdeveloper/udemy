import { Router } from "express";
import { body } from "express-validator";

import * as controllers from "../controllers";
import * as middleware from "../middleware";

export const blogsRouter = Router();

blogsRouter.get("/blogs", middleware.authenticate, controllers.readBlogsController);

blogsRouter.get("/blogs/:blogId", middleware.authenticate, controllers.readBlogController);

blogsRouter.post(
  "/blogs",
    middleware.upload.single("imageUrl"),
  [
    middleware.authenticate,
    body("blog").trim().notEmpty().withMessage("Blog field is required"),
    body("title").trim().notEmpty().withMessage("Title field is required"),
    middleware.validate,
  ],
  controllers.createBlogController
);

blogsRouter.put(
  "/blogs/:blogId",
    middleware.upload.single("imageUrl"),
  [
    middleware.authenticate,
    body("blog").trim().notEmpty().withMessage("Blog field is required"),
    body("title").trim().notEmpty().withMessage("Title field is required"),
    middleware.validate,
  ],
  controllers.updateBlogController
);

blogsRouter.delete("/blogs/:blogId", middleware.authenticate, controllers.deleteBlogController);

import { Router } from "express";
import { body } from "express-validator";

import { validate } from "../middleware";
import * as controllers from "../controllers";

export const userRouter = Router();

userRouter.post(
  "/user/signup",
  [
    body("username").trim().notEmpty().withMessage("Username field is required"),
    body("password").trim().notEmpty().withMessage("Password field is required"),
    validate,
  ],
  controllers.signUpController
);

userRouter.post(
  "/user/signin",
  [
    body("username").trim().notEmpty().withMessage("Username field is required"),
    body("password").trim().notEmpty().withMessage("Password field is required"),
    validate,
  ],
  controllers.signInController
);

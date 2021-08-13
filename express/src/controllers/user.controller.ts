import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { User } from "../models";
import * as errors from "../errors";

export const signUpController = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  try {
    const user = User.createUser({ username, password });
    await user.save();

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.APP_JWT_SECRET!, {
      expiresIn: "10h",
    });
    response.status(201).send({ id: user.id, username: user.username, token });
  } catch (err) {
    return errors.handleDuplicateResource(response);
  }
};

export const signInController = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  const registeredUser = await User.findOne({ username });
  if (!registeredUser) {
    return errors.handleInvalidCredentials(response);
  }

  const isValidPassword = await bcrypt.compare(password, registeredUser.password);
  if (!isValidPassword) {
    return errors.handleInvalidCredentials(response);
  }

  const token = jwt.sign(
    { id: registeredUser.id, username: registeredUser.username },
    process.env.APP_JWT_SECRET!,
    { expiresIn: "10h" }
  );
  response.status(200).send({ id: registeredUser.id, username: registeredUser.username, token });
};

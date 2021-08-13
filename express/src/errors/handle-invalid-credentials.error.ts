import {Response} from "express";

export const handleInvalidCredentials = (response: Response) => {
  response.status(401).send([{error: 'Invalid credentials provided'}]);
};

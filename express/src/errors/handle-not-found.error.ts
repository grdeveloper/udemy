import {Request, Response} from "express";

export const handleNotFound = (request: Request, response: Response) => {
  response.status(404).send([{ error: 'Not Found' }]);
};

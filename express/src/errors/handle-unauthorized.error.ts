import {Response} from "express";

export const handleUnauthorized = (response: Response) => {
  response.status(403).send([{ error: 'Unauthorized to complete the request' }]);
};

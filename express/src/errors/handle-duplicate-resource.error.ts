import {Response} from "express";

export const handleDuplicateResource = (response: Response) => {
  response.status(409).send([{error: 'Resource is already in use'}]);
};

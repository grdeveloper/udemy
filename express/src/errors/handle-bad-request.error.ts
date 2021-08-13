import {Response} from "express";
import { ValidationError } from "express-validator";

export const handleBadRequest = (response: Response, errors: Array<ValidationError>) => {
  const formattedErrors = errors?.reduce((acc, err) => {
    return [...acc, { error: err.msg }];
  }, [] as Array<{error: string}>);

  response.status(400).send(formattedErrors);
};

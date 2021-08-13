import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

import {handleBadRequest} from "../errors";

export const validate = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return handleBadRequest(response, errors.array());
  }

  next();
};

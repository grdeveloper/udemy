import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

import {handleInvalidCredentials} from "../errors";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers?.authorization) {
    return handleInvalidCredentials(response);
  }

  try {
    const token = request.headers.authorization.split('Bearer ')[1];
    request.user = jwt.verify(token, process.env.APP_JWT_SECRET!);
    next();
  } catch(error) {
    return handleInvalidCredentials(response);
  }
};

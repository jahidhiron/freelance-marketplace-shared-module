import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const invalidApiGetwayRequest =
  'verifyGatewayRequest() method: Request not coming from api gateway';
const invalidPayload =
  'verifyGatewayRequest() method: Request payload is invalid';
const message = 'Invalid request';

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

interface IPayload {
  id: string;
  iat: number;
}

export function verifyGatewayRequest(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (!req.headers?.gatewaytoken) {
    throw new NotAuthorizedError(message, invalidApiGetwayRequest);
  }

  try {
    const token = req.headers.gatewaytoken as string;
    const payload = JWT.verify(
      token,
      process.env.GATEWAY_JWT_TOKEN!
    ) as IPayload;
    if (!tokens.includes(payload.id)) {
      throw new NotAuthorizedError(message, invalidPayload);
    }
  } catch (error) {
    throw new NotAuthorizedError(message, invalidApiGetwayRequest);
  }

  next();
}

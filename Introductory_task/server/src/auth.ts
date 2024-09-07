import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function createToken(userId: string): string {
  return jwt.sign(
    {
      userId,
    },
    'secret'
  );
}

export function authorizeToken(token: string): string | undefined {
  let result: jwt.JwtPayload | string;

  try {
    result = jwt.verify(token, 'secret');
  } catch (error) {
    return undefined;
  }

  if (typeof result === 'object') {
    return result.userId;
  }

  return undefined;
}

export function authorizeRequest(request: Request): string | undefined {
  const token = request.cookies.auth;

  if (typeof token === 'string') {
    return authorizeToken(token);
  }
}

export function authorizeResponse(
  response: Response,
  userId: string
): Response {
  return response.cookie('auth', createToken(userId), {
    httpOnly: true,
  });
}

export function unauthorizeResponse(response: Response): Response {
  return response.clearCookie('auth');
}

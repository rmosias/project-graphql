import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "./MyContext";
import authConfig from './config/auth';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization;

  if (!authorization) {
    throw new Error("Not authenticated");
  }
  const [, token] = authorization.split(' ');
  try {
    const payload = verify(token, authConfig.jwt.secret);
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Not authenticated");
  }
  return next();
};
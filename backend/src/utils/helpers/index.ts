import jwt, { SignOptions } from "jsonwebtoken";
import { ResponseModel } from "../../domain/models/response.model";
//import { User } from "../../domain/models/user.entity";
import dotenv from "dotenv";
dotenv.config();

const { JWT_ACCESS_TOKEN_PRIVKEY,JWT_ACCESS_TOKEN_PUBKEY,JWT_REFRESH_TOKEN_PRIVKEY } = process.env;

export function genericResponse(status: number, message: string, data: any) {
  return {
    message: message,
    status_code: status,
    data,
  };
}
export function send200(message: string, data: any): ResponseModel {
  return {
    message: message,
    status_code: 200,
    data,
  };
}

export function send400(message: string, data: any): ResponseModel {
  return {
    message: message,
    status_code: 400,
    data,
  };
}

export function send401(message: string, data: any): ResponseModel {
  return {
    message: message,
    status_code: 401,
    data,
  };
}

export const signJwt = (
  payload: Object,
  key: string,
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(`${JWT_ACCESS_TOKEN_PRIVKEY}`, 'base64').toString(
    'ascii'
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string, key: string): T | null => {
  try {
    const publicKey = Buffer.from(
      `${JWT_ACCESS_TOKEN_PUBKEY}`,
      "base64"
    ).toString("ascii");
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};

export const signToken = async (user: any) => {
  // Sign the access token
  const access_token = signJwt({ user }, `${JWT_ACCESS_TOKEN_PRIVKEY}`, {
    expiresIn: `${60}m`,
  });

  // Sign the refresh token
  const refresh_token = signJwt({ user }, `${JWT_REFRESH_TOKEN_PRIVKEY}`, {
    expiresIn: `${120}m`,
  });

  // Return access token
  return { access_token, refresh_token };
};

import {
  Request,
  Response,
} from 'express';

export interface IAuthUser {
  readonly email: string;
  readonly name: string;
  readonly avatar: string;
  readonly accessToken: string;
}

export type ApiRequestAfterSignIn = Request & {
  user: IAuthUser
};

export interface ITokenData {
  readonly _id: string;
}

export type ApiRequestWithJwt = Request & {
  user: ITokenData;
}

export type ApiResponse = Response;

export interface IUserData {
  readonly id: string;
}

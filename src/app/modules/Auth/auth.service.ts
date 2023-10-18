import { Login } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginResponse, IRefreshTokenResponse } from './auth.interface';

const createLogin = async (data: Login): Promise<ILoginResponse> => {
  const userExisting = await prisma.user.findFirst({
    where: {
      OR: [{ password: data.password }, { email: data.email }],
    },
  });

  if (!userExisting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (userExisting?.password !== data.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not matched');
  }
  const { role, id } = userExisting;

  const token = jwtHelpers.createToken(
    {
      id,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      id,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    token,
    refreshToken,
  };
};
const verifyToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = await jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { id } = verifyToken;
  const isUserExist = await prisma.user.findFirst(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = jwtHelpers.createToken(
    { phoneNumber: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createLogin,
  verifyToken,
};

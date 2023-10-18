import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createAdmin = async (data: User): Promise<User> => {
  data.role = 'admin';

  const userExist = await prisma.user.findFirst({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (
    userExist?.email === data.email ||
    userExist?.password === data.password
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Already email and password Created'
    );
  }

  const result = await prisma.user.create({
    data,
  });

  return result;
};
const createUser = async (data: User): Promise<User> => {
  data.role = 'user';
  const userExist = await prisma.user.findFirst({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (
    userExist?.email === data.email ||
    userExist?.password === data.password
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Already email and password Created'
    );
  }
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const updateIntoDB = async (id: string, data: User): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const deleteFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};
const getSingleFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  createAdmin,
  createUser,
  updateIntoDB,
  deleteFromDB,
  getAllFromDB,
  getSingleFromDB,
};

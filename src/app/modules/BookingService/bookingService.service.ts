import { BookingService, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { BookingServiceSearchAbleFields } from './bookingService.constant';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const insertIntoDB = async (
  id: string,
  data: BookingService
): Promise<BookingService> => {
  // const isUser = await prisma.user.findFirst({
  //   where: {
  //     role: Role.user,
  //   },
  // });
  // if (!isUser) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  // }
  data.userId = id;
  const result = await prisma.bookingService.create({
    data,
  });
  return result;
};
const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<BookingService[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(options);
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: BookingServiceSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  /**
   * person = { name: 'fahim' }
   * name = person[name]
   *
   */

  const whereConditons: Prisma.BookingServiceWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.bookingService.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      user: true,
      repairingCategory: {
        include: {
          user: true,
        },
      },
    },
  });

  const total = await prisma.bookingService.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFromDB = async (id: string): Promise<BookingService | null> => {
  const result = await prisma.bookingService.findUnique({
    where: {
      id: id,
    },
    include: {
      repairingCategory: true,
      user: true,
    },
  });
  return result;
};
const updateFromDB = async (
  id: string,
  data: BookingService
): Promise<BookingService | null> => {
  const result = await prisma.bookingService.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const deleteFromDB = async (id: string): Promise<BookingService | null> => {
  const result = await prisma.bookingService.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const BookingServiceService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  deleteFromDB,
  updateFromDB,
};

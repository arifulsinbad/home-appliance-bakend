import { Prisma, RepairingCategory, Review } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { RepairingCategorySearchAbleFields } from './repairingCategory.constant';

const insertIntoDB = async (
  data: RepairingCategory
): Promise<RepairingCategory> => {
  console.log(data);
  const result = await prisma.repairingCategory.create({
    data: data,
    include: {
      user: true,
    },
  });

  return result;
};
const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<RepairingCategory[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(options);
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: RepairingCategorySearchAbleFields.map(field => ({
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

  const whereConditons: Prisma.RepairingCategoryWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.repairingCategory.findMany({
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
      reviews: true,
      bookingServices: true,
      reportServices: true,
    },
  });

  const total = await prisma.repairingCategory.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFromDB = async (
  id: string
): Promise<RepairingCategory | null> => {
  const result = await prisma.repairingCategory.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
    },
  });
  return result;
};
const updateBookingIncremnet = async (
  data: RepairingCategory
): Promise<RepairingCategory> => {
  const result = await prisma.repairingCategory.update({
    where: {
      id: data.id,
    },
    data: {
      status: false,
    },
  });
  return result;
};
const updateRating = async (
  data: RepairingCategory
): Promise<RepairingCategory> => {
  console.log(data);
  const result = await prisma.repairingCategory.update({
    where: {
      id: data.id,
    },
    data: {
      rating: {
        increment: data.rating,
      },
    },
  });
  return result;
};
const updateBookingDecreamnet = async (
  data: RepairingCategory
): Promise<RepairingCategory> => {
  const result = await prisma.repairingCategory.update({
    where: {
      id: data.id,
    },
    data: {
      status: true,
    },
  });
  return result;
};
const updateIntoDB = async (
  id: string,
  data: RepairingCategory
): Promise<RepairingCategory> => {
  const result = await prisma.repairingCategory.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};
const deleteFromDB = async (id: string): Promise<RepairingCategory | null> => {
  const result = await prisma.repairingCategory.delete({
    where: {
      id: id,
    },
  });
  return result;
};
const reviewPost = async (data: Review) => {
  const result = await prisma.review.create({
    data,
  });
  return result;
};
export const RepairingCategoryService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateBookingIncremnet,
  updateBookingDecreamnet,
  updateIntoDB,
  deleteFromDB,
  reviewPost,
  updateRating,
};

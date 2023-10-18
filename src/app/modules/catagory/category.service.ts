import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};
const updateIntoDB = async (id: string, data: Category): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};
const getSingleFromDB = async (id: string): Promise<Category | null> => {
  const isExistCatagory = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      repairingCategories: true,
    },
  });

  return isExistCatagory;
};

const deleteFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};
export const CategoryService = {
  insertIntoDB,
  deleteFromDB,
  updateIntoDB,
  getAllFromDB,
  getSingleFromDB,
};

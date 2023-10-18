import { RepairingPayment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: RepairingPayment
): Promise<RepairingPayment> => {
  const result = await prisma.repairingPayment.create({
    data,
  });
  return result;
};
const getAllFromDB = async (): Promise<RepairingPayment[]> => {
  const result = await prisma.repairingPayment.findMany({
    include: {
      repairingCategory: true,
      user: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<RepairingPayment> => {
  const result = await prisma.repairingPayment.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const RepairingPaymentService = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};

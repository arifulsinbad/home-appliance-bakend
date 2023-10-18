import { ReportService } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: ReportService): Promise<ReportService> => {
  const result = await prisma.reportService.create({
    data,
  });
  return result;
};
const getAllFromDB = async (): Promise<ReportService[]> => {
  const result = await prisma.reportService.findMany({
    include: {
      repairingCategory: true,
      user: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<ReportService> => {
  const result = await prisma.reportService.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const ReportServiceService = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};

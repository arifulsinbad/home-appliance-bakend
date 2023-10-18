import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { RepairingPaymentService } from './repairingPayment.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RepairingPaymentService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing payment created success',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RepairingPaymentService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing payment fetched success',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RepairingPaymentService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing payment delete success',
    data: result,
  });
});

export const RepairingPaymentController = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
};

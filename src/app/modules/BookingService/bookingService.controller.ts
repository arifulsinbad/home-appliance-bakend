import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { BookingServiceService } from './bookingService.service';
import pick from '../../../shared/pick';
import { BookingServiceFilterAbleFields } from './bookingService.constant';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await BookingServiceService.insertIntoDB(user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking service created success',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookingServiceFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BookingServiceService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking service data fetched!!',
    meta: result.meta,
    data: result.data,
  });
});
const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServiceService.updateFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked service updated success',
    data: result,
  });
});
const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServiceService.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked service single fetched success',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServiceService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booked service delete success',
    data: result,
  });
});

export const BookingServiceController = {
  insertIntoDB,
  getAllFromDB,
  deleteFromDB,
  getSingleFromDB,
  updateFromDB,
};

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { RepairingCategoryService } from './repairingCategory.service';
import pick from '../../../shared/pick';
import { RepairingCategoryFilterAbleFields } from './repairingCategory.constant';
import { IUploadedFile } from '../../../interfaces/file';
import { FileUploaderHelper } from '../../../helpers/fileUploaderHelper';

// const insertIntoDB = catchAsync(async (req:Request, res:Response) => {
//     const result = await
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success:true,
//         message:"Repairing Category created success",
//         data:result
//     })
// })
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.file);
  const user = (req as any).user;
  console.log(req);
  const file = req.file as IUploadedFile;
  const uploadFile = await FileUploaderHelper.uploadToCloudinary(file);
  if (uploadFile) {
    req.body.image = uploadFile.secure_url;
  }

  if (user) {
    req.body.userId = user.id;
  }
  const result = await RepairingCategoryService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category created success',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, RepairingCategoryFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await RepairingCategoryService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category data fetched!!',
    meta: result.meta,
    data: result.data,
  });
});
const updateBookingIncremnet = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RepairingCategoryService.updateBookingIncremnet(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Repairing Category booking increament update success',
      data: result,
    });
  }
);
const updateBookingDecreamnet = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RepairingCategoryService.updateBookingDecreamnet(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Repairing Category booking decreament update success',
      data: result,
    });
  }
);
const updateRating = catchAsync(async (req: Request, res: Response) => {
  const result = await RepairingCategoryService.updateRating(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category rating update',
    data: result,
  });
});
const reviewPost = catchAsync(async (req: Request, res: Response) => {
  const result = await RepairingCategoryService.reviewPost(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category review post success',
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RepairingCategoryService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category  update success',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RepairingCategoryService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category  delete success',
    data: result,
  });
});
const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RepairingCategoryService.getSingleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repairing Category  single data success',
    data: result,
  });
});

export const RepairingCategoryController = {
  insertIntoDB,
  getAllFromDB,
  updateBookingDecreamnet,
  updateBookingIncremnet,
  updateIntoDB,
  deleteFromDB,
  getSingleFromDB,
  reviewPost,
  updateRating,
};

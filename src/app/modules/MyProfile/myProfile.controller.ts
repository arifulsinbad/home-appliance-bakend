import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MyProfileService } from './myProfile.service';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  //   console.log(user);
  const result = await MyProfileService.getMyProfile(user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Profile get success',
    data: result,
  });
});

export const MyProfileController = {
  getMyProfile,
};

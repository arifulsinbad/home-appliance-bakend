import express, { NextFunction, Request, Response } from 'express';
import { RepairingCategoryController } from './repairingCategory.controller';
import { FileUploaderHelper } from '../../../helpers/fileUploaderHelper';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploaderHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    return RepairingCategoryController.insertIntoDB(req, res, next);
  }
);
router.get('/', RepairingCategoryController.getAllFromDB);
router.post('/review', RepairingCategoryController.reviewPost);
router.patch('/rating', RepairingCategoryController.updateRating);

router.get('/:id', RepairingCategoryController.getSingleFromDB);
router.patch(
  '/booking-increment',
  RepairingCategoryController.updateBookingIncremnet
);
router.patch(
  '/booking-decreament',
  RepairingCategoryController.updateBookingDecreamnet
);
router.patch('/:id', RepairingCategoryController.updateIntoDB);
router.delete('/:id', RepairingCategoryController.deleteFromDB);
export const RepairingCategoryRoute = router;

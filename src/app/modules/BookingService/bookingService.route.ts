import express from 'express';
import { BookingServiceController } from './bookingService.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingServiceController.insertIntoDB
);
router.get('/', BookingServiceController.getAllFromDB);
router.get('/:id', BookingServiceController.getSingleFromDB);
router.patch('/:id', BookingServiceController.updateFromDB);
router.delete('/:id', BookingServiceController.deleteFromDB);

export const BookingServiceRoute = router;

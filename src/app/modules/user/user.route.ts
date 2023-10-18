import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.create),
  UserController.createUser
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.create),
  UserController.createAdmin
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllFromDB
);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleFromDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteFromDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateIntoDB
);

export const UserRoute = router;

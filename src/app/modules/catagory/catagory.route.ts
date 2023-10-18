import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './catagory.controller';

const router = express.Router();

router.post(
  '/create-category',

  CategoryController.insertIntoDB
);
router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getSingleFromDB);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteFromDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateIntoDB
);

export const CategoryRoute = router;

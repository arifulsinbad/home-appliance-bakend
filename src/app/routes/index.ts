import express from 'express';
import { AuthRoute } from '../modules/Auth/auth.route';
import { MyProfileRoute } from '../modules/MyProfile/myProfile.route';

import { CategoryRoute } from '../modules/catagory/catagory.route';
import { UserRoute } from '../modules/user/user.route';
import { RepairingCategoryRoute } from '../modules/RepairingCategory/repairingCategory.route';
import { BookingServiceRoute } from '../modules/BookingService/bookingService.route';
import { RepairingPaymentRoute } from '../modules/repairingPayment/repairingPayment.route';
import { ReportServiceRoute } from '../modules/reportService/reportService.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoute,
  },

  {
    path: '/users',
    routes: UserRoute,
  },
  {
    path: '/categories',
    routes: CategoryRoute,
  },

  {
    path: '/profile',
    routes: MyProfileRoute,
  },
  {
    path: '/repairingCategories',
    routes: RepairingCategoryRoute,
  },
  {
    path: '/bookingServices',
    routes: BookingServiceRoute,
  },
  {
    path: '/repairingPayments',
    routes: RepairingPaymentRoute,
  },
  {
    path: '/reportServices',
    routes: ReportServiceRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

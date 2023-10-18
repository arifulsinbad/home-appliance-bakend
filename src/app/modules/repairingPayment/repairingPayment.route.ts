import express from 'express';
import { RepairingPaymentController } from './repairingPayment.controller';
const router = express.Router();
router.post('/', RepairingPaymentController.insertIntoDB);
router.get('/', RepairingPaymentController.getAllFromDB);
router.delete('/:id', RepairingPaymentController.deleteFromDB);

export const RepairingPaymentRoute = router;

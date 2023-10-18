import express from 'express';
import { ReportServiceController } from './reportService.controller';
const router = express.Router();
router.post('/', ReportServiceController.insertIntoDB);
router.get('/', ReportServiceController.getAllFromDB);
router.delete('/:id', ReportServiceController.deleteFromDB);

export const ReportServiceRoute = router;

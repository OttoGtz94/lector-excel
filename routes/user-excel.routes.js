import express from 'express';
import {
	postData,
	readExcel,
} from '../controllers/user-excel.controller.js';

const router = express.Router();

router.get('/read-excel', readExcel);
router.post('/save-excel', postData);
export default router;

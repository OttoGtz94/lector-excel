import express from 'express';
import {
	deleteData,
	postData,
	readExcel,
	updateData,
} from '../controllers/user-excel.controller.js';

const router = express.Router();

router.get('/read-excel', readExcel);
router.post('/save-excel', postData);
router.put('/edit-excel/:_id', updateData);
router.delete('/delete-excel', deleteData);

export default router;

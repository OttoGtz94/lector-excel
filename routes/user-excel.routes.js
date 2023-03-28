import express from 'express';
import {
	deleteData,
	postData,
	readExcel,
	updateData,
} from '../controllers/user-excel.controller.js';
import multer from 'multer';
import { clearUploads } from '../helpers/index.js';

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: (req, file, cb) => {
		clearUploads('uploads');
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

const router = express.Router();

router.post('/read-excel', upload.any(), readExcel);
router.post('/save-excel', postData);
router.put('/edit-excel/:_id', updateData);
router.delete('/delete-excel', deleteData);

export default router;

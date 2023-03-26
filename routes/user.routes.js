import express from 'express';
import {
	changePassword,
	login,
	newUser,
	user,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', user);
router.post('/new-user', newUser);
router.post('/login', login);
router.post('/change-password', changePassword);

export default router;

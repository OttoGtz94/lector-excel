import express from 'express';
import {
	login,
	newUser,
	user,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', user);
router.post('/new-user', newUser);
router.post('/login', login);

export default router;

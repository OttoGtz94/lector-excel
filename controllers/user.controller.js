import {
	generateId,
	generateJWT,
} from '../helpers/index.js';
import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const user = (req, res) => {
	res.json({
		msg: 'User',
	});
};

const newUser = async (req, res) => {
	//console.log(req.body);
	const { userName } = req.body;
	const existUserName = await UserModel.findOne({
		userName,
	});

	if (existUserName) {
		const error = new Error(
			'Este nombre de usuario no esta disponible',
		);
		return res
			.status(400)
			.json({ status: 400, msg: error.message });
	}

	try {
		const userModel = new UserModel(req.body);

		userModel.token = generateId();
		await userModel.save();

		res.json({
			status: 200,
			msg: `El usuario ${req.body.name} se creo correctamente`,
		});
	} catch (error) {
		//console.log('Error User Controller newUser', error);
		res.json({
			status: 500,
			msg: 'Error al insertar usuario',
			error: error,
		});
	}
};

const login = async (req, res) => {
	const { userName, password } = req.body;
	try {
		const existUserName = await UserModel.findOne({
			userName,
		});

		if (!existUserName) {
			return res.status(400).json({
				status: 404,
				msg: 'Usuario y/o contraseña incorrectos',
			});
		}

		const successLogin =
			await existUserName.checkPassword(password);

		if (!successLogin) {
			return res.status(400).json({
				status: 404,
				msg: 'Usuario y/o contraseña incorrectos',
			});
		}

		res.json({
			status: 200,
			msg: 'Usuario autenticado',
			token: generateJWT(existUserName),
		});
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un error al iniciar sesión',
		});
	}
};

const changePassword = async (req, res) => {
	const { userName, password } = req.body;
	try {
		const user = await UserModel.findOne({ userName });
		user.password = password;
		await user.save();
		res.json({
			status: 200,
			msg: 'Contraseña actualizada correctamente',
		});
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un error al actualizar la contraseña',
		});
	}
};

const hasToken = async (req, res) => {
	const { token } = req.body;
	const dataJWT = jwt.decode(token);
	if (dataJWT !== null) {
		res.json({
			status: 200,
			dataJWT,
			msg: 'Autenticación Correcta',
		});
	} else {
		res.json({ status: 400, msg: 'No existe el token' });
	}
};

export { user, newUser, login, changePassword, hasToken };

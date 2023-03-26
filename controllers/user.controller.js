import {
	generateId,
	generateJWT,
} from '../helpers/index.js';
import UserModel from '../models/user.model.js';
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
		const successUser = await userModel.save();

		res.json({
			status: 200,
			msg: `El usuario ${req.body.name} se creo correctamente`,
			successUser,
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

export { user, newUser, login, changePassword };

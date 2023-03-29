import xlsx from 'xlsx';
import UserExcel from '../models/user-excel.model.js';
import path from 'path';
import fs from 'fs';
import { clearUploads } from '../helpers/index.js';

const readExcel = (req, res) => {
	try {
		const file = xlsx.readFile(
			`uploads/${req.files[0].originalname}`,
			{},
		);

		let data = [];
		const sheets = file.SheetNames;
		for (let i = 0; i < sheets.length; i++) {
			const temp = xlsx.utils.sheet_to_json(
				file.Sheets[file.SheetNames[i]],
				{ raw: false },
			);
			temp.forEach(res => {
				data.push(res);
			});
		}
		res.json({
			status: 200,
			data,
			msg: `El archivo ${req.files[0].originalname} se leyo satisfactoriamente`,
		});
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un problema al leer el archivo',
		});
	}
};

const getRegisters = async (req, res) => {
	try {
		const registers = await UserExcel.find({
			user_creator_id: req.params._id,
		});

		if (registers.length > 0) {
			res.json({
				status: 200,
				msg: 'Los datos se obtuvieron satisfactoriamente.',
				registers,
			});
		} else {
			res.json({
				status: 400,
				msg: 'No se encontraron registros',
			});
		}
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un error al obtener los registros.',
		});
	}
};

const postData = (req, res) => {
	const { users } = req.body;
	const duplicates = [];
	if (users.length === 0) {
		return res.json({
			status: 404,
			msg: 'No se encontraron datos para guardar',
		});
	}
	try {
		users.forEach(async user => {
			const userExcelModel = await UserExcel(user);
			const existData = await UserExcel.findOne({
				user_creator_id: user.user_creator_id,
				user_id: user.user_id,
				date: user.date,
			});

			if (existData !== null) {
				duplicates.push(userExcelModel);
			} else {
				await userExcelModel.save();
			}
		});
		setTimeout(() => {
			res.json({
				status: 200,
				msg: 'Guardado correctamente',
				duplicates:
					duplicates.length > 0
						? duplicates
						: 'No hubo duplicados',
			});
		}, 2000);
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un problema al guardar los datos',
		});
	}
};

const updateData = async (req, res) => {
	/* console.log(req.body, req.params);
	res.json({ status: 200 }); */
	if (Object.entries(req.body).length === 0) {
		return res.json({
			status: 404,
			msg: 'No se encontro información para actualizar',
		});
	}

	try {
		await UserExcel.findByIdAndUpdate(
			{
				_id: req.params._id,
			},
			req.body,
		);
		res.json({
			status: 200,
			msg: 'Información actualizada',
		});
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un problema al actualizar',
		});
	}
};

const deleteData = async (req, res) => {
	try {
		await UserExcel.findOneAndDelete({
			_id: req.params._id,
		});
		res.json({
			status: 200,
			msg: 'Se elimino correctamente',
		});
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un problema al eliminar',
		});
	}
};

export {
	readExcel,
	postData,
	updateData,
	deleteData,
	getRegisters,
};

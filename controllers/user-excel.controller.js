import xlsx from 'xlsx';
import UserExcel from '../models/user-excel.model.js';
import path from 'path';
import fs from 'fs';

const readExcel = (req, res) => {
	console.log(req.body.data);
	console.log(req.files);
	/* fs.writeFile(
		req.files[0].originalname,
		req.files[0].buffer,
		err => {
			if (err) {
				console.log('Error', err);
			} else {
				console.log('firsSin errores');
			}
		},
	); */

	const file = xlsx.readFile('excel-test.xlsx'); //funciona

	/* console.log(req.body.excel);
	const { pathname: root } = new URL(
		'../',
		import.meta.url,
	); */

	let data = [];
	const sheets = file.SheetNames;
	//console.log({ file, sheets });
	for (let i = 0; i < sheets.length; i++) {
		const temp = xlsx.utils.sheet_to_json(
			file.Sheets[file.SheetNames[i]],
			{ raw: false },
		);
		temp.forEach(res => {
			//console.log(res);
			data.push(res);
		});
	}
	res.json({ status: 200, data, excel: req.body.excel });
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
			console.log('for');
			const userExcelModel = await UserExcel(user);
			const existData = await UserExcel.findOne({
				userId: user.userId,
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
			_id: req.body._id,
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

export { readExcel, postData, updateData, deleteData };

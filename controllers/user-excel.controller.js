import xlsx from 'xlsx';
import UserExcel from '../models/user-excel.model.js';

const readExcel = (req, res) => {
	const file = xlsx.readFile('excel-test.xlsx');

	let data = [];
	const sheets = file.SheetNames;
	//console.log({ file, sheets });
	for (let i = 0; i < sheets.length; i++) {
		const temp = xlsx.utils.sheet_to_json(
			file.Sheets[file.SheetNames[i]],
			{ raw: false },
		);
		temp.forEach(res => {
			console.log(res);
			data.push(res);
		});
	}
	res.json({ data });
};

const postData = (req, res) => {
	const { users } = req.body;
	if (users.length === 0) {
		return res.json({
			status: 404,
			msg: 'No se encontraron datos para guardar',
		});
	}
	try {
		users.forEach(async user => {
			const userExcelModel = await UserExcel(user);

			await userExcelModel.save();
		});
		res.json({
			status: 200,
			msg: 'Guardado correctamente',
		});
	} catch (error) {
		res.json({
			status: 500,
			msg: 'Hubo un problema al guardar los datos',
		});
	}
};

export { readExcel, postData };

import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserExcelSchema = new Schema({
	userId: {
		type: String,
		trim: true,
	},
	userName: {
		type: String,
		trim: true,
	},
	date: {
		type: Date, //mm-dd-yy
	},
	punchIn: {
		type: String,
		trim: true,
	},
	punchOut: {
		type: String,
		trim: true,
	},
});

const UserExcel = mongoose.model(
	'UserExcel',
	UserExcelSchema,
);

export default UserExcel;

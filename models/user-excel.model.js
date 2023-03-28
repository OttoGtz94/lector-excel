import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserExcelSchema = new Schema({
	user_id: {
		type: String,
		trim: true,
	},
	user_name: {
		type: String,
		trim: true,
	},
	date: {
		type: Date, //mm-dd-yy
	},
	punch_in: {
		type: String,
		trim: true,
	},
	punch_out: {
		type: String,
		trim: true,
	},
});

const UserExcel = mongoose.model(
	'UserExcel',
	UserExcelSchema,
);

export default UserExcel;

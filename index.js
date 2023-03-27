import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import userExcelRoutes from './routes/user-excel.routes.js';
//import fileUpload from 'express-fileupload';

const app = express();

dotenv.config();
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Error de cors'));
		}
	},
};

app.use(cors(corsOptions));
app.use(express.json());
//app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/excel', userExcelRoutes);

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
	console.log(`Servidor corriendo en puerto ${PORT}`);
});

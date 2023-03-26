import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';

const app = express();
app.use(express.json());

dotenv.config();

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
	console.log(`Servidor corriendo en puerto ${PORT}`);
});

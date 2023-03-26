import mongoose from 'mongoose';

const connectDB = async () => {
	console.log('Conectar DB');
	try {
		/* const connection = await mongoose
			.createConnection(
				process.env.DB
			)
			.asPromise(); */

		await mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('CONEXION EXITOSA:');
	} catch (error) {
		console.log(`errorconnectDB: ${error}`);
		process.exit(1);
	}
};

export default connectDB;

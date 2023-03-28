import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
export const generateId = () => {
	const random = Math.random().toString(32).substring(2);
	const date = Date.now().toString(32);

	return random + date;
};

export const generateJWT = user => {
	return jwt.sign(
		{
			id: user._id,
			name: user.name,
			firstName: user.firstName,
			userName: user.userName,
		},
		process.env.JWT,
		{
			expiresIn: '30d',
		},
	);
};

export const clearUploads = directory_path => {
	if (fs.existsSync(directory_path)) {
		fs.readdirSync(directory_path).forEach(
			(file, index) => {
				const currentPath = path.join(
					directory_path,
					file,
				);

				if (fs.lstatSync(currentPath).isDirectory()) {
					clearUploads(currentPath);
				} else {
					fs.unlinkSync(currentPath);
				}
			},
		);
		//fs.rmdirSync(directory_path);
	}
};

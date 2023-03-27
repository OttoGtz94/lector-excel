import jwt from 'jsonwebtoken';
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

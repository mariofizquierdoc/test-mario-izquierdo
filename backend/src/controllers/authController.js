const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const user = await registerUser(email, password, firstName, lastName);
		return res.status(201).json({ message: 'User registered successfully!', user: user });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { token, user } = await loginUser(email, password);
		return res.json({
			message: 'Login successful!',
			token,
			user
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

module.exports = { register, login };
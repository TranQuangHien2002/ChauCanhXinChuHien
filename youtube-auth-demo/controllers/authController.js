const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
  login: (req, res) => {
    const { username, password } = req.body;

    // Giả sử có người dùng 'admin' với mật khẩu 'password'
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  },
};

module.exports = authController;

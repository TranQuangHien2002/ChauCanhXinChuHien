const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const youtubeController = require('./controllers/youtubeController');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3001', // Cho phép truy cập từ frontend React
  credentials: true, // Để cho phép cookie và các thông tin xác thực khác
}));

app.use(express.json());

// Route đăng nhập và tạo JWT
app.post('/login', authController.login);

// Route ủy quyền YouTube OAuth 2.0 - Được bảo vệ bởi JWT
app.get('/youtube/auth', authMiddleware, youtubeController.authorize);

// Callback của YouTube OAuth 2.0 - Được bảo vệ bởi JWT
app.get('/oauth2callback', authMiddleware, youtubeController.oauth2callback);

// Kiểm tra quyền truy cập video - Được bảo vệ bởi JWT
app.get('/youtube/check', authMiddleware, youtubeController.checkVideoAccess);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

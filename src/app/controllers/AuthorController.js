const Author = require('../models/author');
const jwtService = require('../../util/jwt-service');
const bcrypt = require('bcrypt');

class AuthorController {
    // [POST] - Register
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Các trường đều là bắt buộc !',
                    status: false
                });
            }

            const existsUser = await Author.findOne({
                $or: [
                    { email: email },
                    { name: name }
                ]
            });
            if (existsUser) {
                return res.status(400).json({ message: 'Tên hoặc email đã tồn tại !', status: false });
            }

            // Kiểm tra nếu mật khẩu được truyền vào = password secret
            let role = 'user';
            if (password === process.env.ADMIN_SETUP_PASSWORD) {
                const existsAdmin = await Author.findOne({ role: "admin" });
                role = existsAdmin ? 'user' : 'admin';
            }

            // Mã hóa mật khẩu 
            const hashedPassword = await bcrypt.hash(password, 10);

            const newAuthor = new Author({
                name: name,
                email: email,
                password: hashedPassword,
                role: role
            });

            await newAuthor.save();

            res.status(200).json({
                message: "Tạo tài khoản thành công",
                status: true,
            });

        } catch (error) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo tài khoản !' });
        }
    }

    // [POST] - Login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Vui lòng nhập đầy đủ thông tin !",
                    status: false
                });
            }

            const user = await Author.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    message: "Tài khoản không tồn tại !",
                    status: false
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Tài khoản hoặc mật khẩu không đúng !',
                    status: false
                });
            }

            // Tạo token JWT
            const accessToken = await jwtService.generateJWT({
                id: user._id,
                email: user.email,
                role: user.role
            });

            // Trả về token và thông báo thành công
            res.status(200).json({
                accessToken: accessToken,
                message: "Đăng nhập thành công",
                status: true,
            });

        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi đăng nhập !',
                status: false
            });
        }
    }
}

module.exports = new AuthorController();

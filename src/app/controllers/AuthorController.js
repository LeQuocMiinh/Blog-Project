const Author = require('../models/author');
const jwtService = require('../../utils/jwt-service');
const bcrypt = require('bcrypt');
const { isEmail } = require("validator");
const { APIError } = require('../../utils/api-errors');
class AuthorController {
    // [POST] - Register
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new APIError(400, 'Vui lòng điền đầy đủ!');
            }

            if (!isEmail(email)) {
                throw new APIError(400, 'Email không hợp lệ!');
            }

            const existsUser = await Author.findOne({
                $or: [
                    { email: email },
                    { name: name }
                ]
            });
            if (existsUser) {
                throw new APIError(400, 'Tên hoặc Email đã tồn tại!');
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

            res.json({
                message: "Tạo tài khoản thành công",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // [POST] - Login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new APIError(400, 'Vui lòng điền đầy đủ!');
            }

            if (!isEmail(email)) {
                throw new APIError(400, 'Email không hợp lệ!');
            }

            const user = await Author.findOne({ email });
            if (!user) {
                throw new APIError(400, 'Tài khoản không tồn tại!');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new APIError(400, 'Tài khoản hoặc mật khẩu không đúng!');
            }

            // Tạo token JWT
            const accessToken = await jwtService.generateJWT({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });

            // Trả về token và thông báo thành công
            res.json({
                accessToken: accessToken,
                message: "Đăng nhập thành công",
                status: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] - Fetch user
    async fetchUser(req, res, next) {
        try {
            const data = {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            };
            res.json({
                data: data,
                status: true
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.json({
                message: 'Đăng xuất thành công',
                status: true
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AuthorController();

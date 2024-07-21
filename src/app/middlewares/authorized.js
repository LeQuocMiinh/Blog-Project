const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../util/api-errors');
const Author = require('../models/author');
const bcrypt = require('bcrypt');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startWidth('Bearer ')) {
            return res.status(401).json({
                message: "Token không hợp lệ!!!"
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        throw new UnauthorizedError(error.message);
    }
}

const authorizeAdmin = (req, res, next) => {
    if (req.user.role != "admin") {
        return res.status(401).json({
            message: "Bạn không có quyền truy cập vào tài nguyên này!!!"
        })
    }
    next();
}

module.exports = { authenticate, authorizeAdmin };

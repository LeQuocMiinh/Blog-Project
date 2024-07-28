const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../utils/api-errors');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError('Token không hợp lệ !');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

const authorizeAdmin = (req, res, next) => {
    if (req.user.role != "admin") {
        throw new UnauthorizedError('Bạn không có quyền truy cập vào tài nguyên này !');
    }
}

module.exports = { authenticate, authorizeAdmin };

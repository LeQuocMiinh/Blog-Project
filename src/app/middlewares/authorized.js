const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Token không hợp lệ !"
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token không hợp lệ !"
        });
    }
}

const authorizeAdmin = (req, res, next) => {
    if (req.user.role != "admin") {
        return res.status(401).json({
            message: "Bạn không có quyền truy cập vào tài nguyên này !"
        })
    }
    next();
}

module.exports = { authenticate, authorizeAdmin };

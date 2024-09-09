const jwt = require('jsonwebtoken');
const generateJWT = async (
    payload,
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
    signOption = JSON.parse(process.env.JWT_SIGN_OPTIONS) // Chuyển đổi JSON thành đối tượng
) => {
    try {
        const token = jwt.sign(payload, secretKey, signOption);
        return token;
    } catch (error) {
        return error;
    }
}

const verifyJWT = async (
    token,
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
    signOption = JSON.parse(process.env.JWT_SIGN_OPTIONS)
) => {
    try {
        const data = jwt.verify(token, secretKey, signOption);
        return data;
    } catch (error) {
        return error;
    }
}


module.exports = { generateJWT, verifyJWT };
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../../util/api-errors');


const generateJWT = async (
    payload,
    secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
    signOption = JSON.parse(process.env.JWT_SIGN_OPTIONS) // Chuyển đổi JSON thành đối tượng
) => {
    try {
        const token = jwt.sign(payload, secretKey, signOption);
        return token;
    } catch (error) {
        throw new BadRequestError(error.message);
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
        throw new BadRequestError(error.message);
    }
}


module.exports = { generateJWT, verifyJWT };
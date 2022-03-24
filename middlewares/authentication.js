const jsonwebtoken = require('jsonwebtoken')
const {
    errorMessage,
    status
} =  require('../helpers/status')
const dotenv = require('dotenv')
dotenv.config()

const secretOrPublicKey = process.env.SECRET_OR_PUBLIC_KEY

module.exports = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        errorMessage.error = 'Token not provided'
        return res.status(status.bad).send(errorMessage)
    }

    try {
        const decoded = jsonwebtoken.verify(token, secretOrPublicKey)
        req.user = {
            idPengguna: decoded.idPengguna,
        }
        next()
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
}
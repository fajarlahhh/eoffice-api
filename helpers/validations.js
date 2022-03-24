const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const secretOrPublicKey = process.env.SECRET_OR_PUBLIC_KEY

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const hashPassword = password => bcrypt.hashSync(password, salt)

const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false
    }
    return true
}

const comparePassword = (hashPassword, password) => {
    return bcrypt.compareSync(password, hashPassword)
}

const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true
    }
    if (input.replace(/\s/g, '').length) {
        return false
    }
    return true
}

const empty = (input) => {
    if (input === undefined || input === ''){
        return true
    }
}

const generateUserToken = (id) => {
    const token = jsonwebtoken.sign({
        idPengguna: id,
    }, secretOrPublicKey)
    return token
}

exports.hashPassword = hashPassword
exports.comparePassword = comparePassword
exports.generateUserToken = generateUserToken
exports.validatePassword = validatePassword
exports.isEmpty = isEmpty
exports.empty = empty
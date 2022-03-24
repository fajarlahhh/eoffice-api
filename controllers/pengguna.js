const db = require('../config/db')
const {
    comparePassword,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken
} = require('../helpers/validations')
const {
    errorMessage,
    successMessage,
    status
} = require('../helpers/status')

exports.login = async (req, res) => {
    const { uid, password, imei } = req.body
    if (isEmpty(uid)) {
        errorMessage.data = 'uid tidak boleh kosong';
        return res.status(status.bad).send(errorMessage);
    }
    if (isEmpty(password)) {
        errorMessage.data = 'password tidak boleh kosong';
        return res.status(status.bad).send(errorMessage);
    }
    if (isEmpty(imei)) {
        errorMessage.data = 'imei tidak boleh kosong';
        return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.data = 'password tidak boleh kosong dan minimal 6 karakter';
        return res.status(status.bad).send(errorMessage);
    }
     
    try {
        await db.query('SELECT * FROM (pengguna a LEFT JOIN (personalia.pegawai b LEFT JOIN personalia.bagian c ON b.kd_bagian=c.kd_bagian) ON a.nip=b.nip) LEFT JOIN level_pengguna d ON a.id=d.id_pengguna WHERE a.nip = ?', uid, (error, result) =>{
            if (error) {
                errorMessage.data = error;
                return res.status(status.error).json(errorMessage);
            }
            if (result.length === 0) {
                errorMessage.data = 'No record found';
                return res.status(status.notfound).send(errorMessage);
            }
            if (!comparePassword(result[0].kata_sandi, password)) {
                errorMessage.data = 'Wrong password';
                return res.status(status.bad).send(errorMessage);
            }
            if (result[0].status == 0) {
                errorMessage.data = 'User is not active';
                return res.status(status.bad).send(errorMessage);
            }
            if (result[0].deleted_at) {
                errorMessage.data = 'Record deleted';
                return res.status(status.bad).send(errorMessage);
            }
            if (!empty(result[0].imei)) {
                errorMessage.data = 'User already logged in';
                return res.status(status.bad).send(errorMessage);
            }
    
            const token = generateUserToken(result[0].nip)
            delete result[0].kata_sandi;
            delete result[0].status;
            delete result[0].session_id;
            delete result[0].remember_token;
            delete result[0].created_at;
            delete result[0].updated_at;
            delete result[0].deleted_at;
            successMessage.data = result[0];
            successMessage.data.token = token;
            return res.status(status.success).send(successMessage);
        })        
    } catch (error) {
        errorMessage.data = error.message;
        return res.status(status.error).json(errorMessage);
    }
    
}
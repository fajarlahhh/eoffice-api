const mysql = require('../config/db')
const {
    errorMessage,
    successMessage,
    status
} = require('../helpers/status')
const {
    isEmpty,
} = require('../helpers/validations');

const all = async (req, res) => {
    const {
        jabatan
    } = req.body

    try {
        await db.query('SELECT * FROM disposisi di LEFT JOIN dokumen do ON di.id_dokumen=do.id WHERE di.status=0' + (isEmpty(jabatan)? '': ' AND tujuan=? ', [
            jabatan
        ], (error, result) =>{
            if (error) {
                errorMessage.data = error;
                return res.status(status.error).json(errorMessage);
            }
            successMessage.data = result;
            return res.status(status.success).json(successMessage);
        }))
    } catch (error) {
        errorMessage.data = error.message;
        return res.status(status.error).json(errorMessage);
    }
}

exports.all = all
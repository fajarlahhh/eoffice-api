const mysql = require('../config/db')
const {
    errorMessage,
    successMessage,
    status
} = require('../helpers/status')
const {
    isEmpty,
    empty,
} = require('../helpers/validations');

const all = async (req, res) => {
    const {
        jabatan
    } = req.body

    if (empty(jabatan)) {
        errorMessage.data = 'jabatan tidak boleh kosong';
        return res.status(status.bad).send(errorMessage);
    }

    try {
        await mysql.query('SELECT * FROM disposisi di LEFT JOIN dokumen do ON di.id_dokumen=do.id WHERE di.status=0 AND tujuan=?', [
            jabatan
        ], (error, result) =>{
            if (error) {
                errorMessage.data = error;
                return res.status(status.error).json(errorMessage);
            }
            successMessage.data = result;
            return res.status(status.success).json(successMessage);
        })
    } catch (error) {
        errorMessage.data = error.message;
        return res.status(status.error).json(errorMessage);
    }
}

exports.all = all
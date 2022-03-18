const successMessage = { status : 'success'}
const errorMessage = { status: 'error' }
const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204
}

exports.successMessage = successMessage
exports.errorMessage = errorMessage
exports.status = status
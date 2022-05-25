module.exports = Exception;

function Exception(status = 200, message = '' ) {
    this.status = status;
    this.message = message;
}
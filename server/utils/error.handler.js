
function errorHandler(err, req, res) {
    res.send({
        success: 'false',
        msg: 'Some error occured!'
    });
}

module.exports = {
    errorHandler
}
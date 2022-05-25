module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            console.log( 'caiu no erro' );
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });

        case typeof err === 'function':
            return res.status(err.status).json({ message: err.message });
            
        default:
            return res.status(500).json({ message: err.message });
    }
}
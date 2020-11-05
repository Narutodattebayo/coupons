const { celebrate, Joi, errors, Segments,isCelebrateError,isCelebrate } = require('celebrate');

const errorHandler = (err, req, res, next) => {
    if (isCelebrate(err)) {
        return res.status(400).send({
            success: false,
            statusCode: 400,
            key: err.joi.details[0].context.key,
            message: err.joi.details[0].message.replace(/"/g, '')
        });
    } else if (err.expose) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode
        });
    } else {
        console.log('ERROR -> ', err);
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }

}

const invalidRoute=(req,res,next)=>{
    res.send({http:404,status:404,message:"Route not found"})
}

module.exports = { errorHandler,invalidRoute }
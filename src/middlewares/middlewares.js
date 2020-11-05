const jwt = require("jsonwebtoken")
const CONSTANT = require("../constants/constants").CONSTANTS
const { verifyToken } = require("./auth")
const adminModel = require('../models/admin.model')
const adminSessionModel = require("../models/admin.session.model")
const databaseService = require('../entity/baseEntity').databaseService
const { Types } = require("mongoose")
const MIDDLEWARE = {
    
    VerifyAdminSession: async (req, res, next) => {
        try {
            if (req.headers && req.headers.authorization) {
                let authMethod = req.headers.authorization.split(" ")[0],
                    authToken = req.headers.authorization.split(" ")[1];
                if (authMethod === 'Bearer' && authToken) {
                    let decrypted = verifyToken(authToken);
                    console.log(decrypted)
                    if (decrypted.success) {
                        let sessionData = await databaseService.findOne(adminSessionModel, { _id: Types.ObjectId(decrypted.data.sessionId) })
                        console.log(sessionData, "1111111111111")
                        if (sessionData && sessionData.status == "active") {
                            res.locals.adminSessionId = sessionData._id;
                            res.locals.adminId = sessionData.userId;
                            next();
                        } else res.status(401).send({ success: false, statusCode: 401, message: 'Invalid Session or Session expired' });
                    } else res.status(401).send({ success: false, statusCode: 401, message: 'Invalid authorization token' });
                } else res.status(400).send({ success: false, statusCode: 401, message: 'Invalid authorization method' });
            } else res.status(401).send({ success: false, statusCode: 401, message: 'Authorization header missing' });
        } catch (err) {
            res.send({ http: 400, status: 400, message: "Invalid access Token" })
        }

    }


}
module.exports = { MIDDLEWARE }
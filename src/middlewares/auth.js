 const jwt=require("jsonwebtoken")
const Constants = require("../constants/constants").CONSTANTS
 const verifyToken = (token) => {
    try {
        let payload = jwt.verify(token, Constants.SECRET_KEY, { algorithms: ['HS256'] });
        if (payload) {
            return { success: true, data: payload };
        } else return { success: false };
    } catch (err) {
        return { success: false }
    }

}
module.exports={verifyToken}
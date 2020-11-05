const databaseService = require("./entity/baseEntity").databaseService
const adminModel = require("./models/admin.model")
const crypto = require("crypto")
const Constants=require("./constants/constants").CONSTANTS
let password =  crypto.createHmac('sha256', Constants.SALT).update("Admin@12345").digest('hex');
let payload = { name: "admin", email: "admin@yopmail.com", password: password }
const boostrap = {
    addAdmin: async()=>{
        let alreadyExisting=await databaseService.findOne(adminModel,{email:"admin@yopmail.com"})
        if(!alreadyExisting)
        databaseService.insert(adminModel, payload)
    }
}
module.exports = { boostrap }
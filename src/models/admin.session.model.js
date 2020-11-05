const mongoose = require("mongoose")

const adminSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: mongoose.Schema.Types.String },
    isDelete: { type: mongoose.Schema.Types.Boolean }

}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Admin_Session', adminSessionSchema)


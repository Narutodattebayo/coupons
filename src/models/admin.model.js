const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String },
    email: { type: mongoose.Schema.Types.String,required:true },
    password: { type: mongoose.Schema.Types.String },
    image: { type: mongoose.Schema.Types.String }
}, { versionKey: false, timestamps: true })

module.exports= mongoose.model('Admins', adminSchema)


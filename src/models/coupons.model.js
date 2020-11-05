const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema({
    code: { type: mongoose.Schema.Types.String },
    startDate: { type: mongoose.Schema.Types.Date, required: true },
    endDate: { type: mongoose.Schema.Types.Date, required: true },
    minAmountForApplicability: { type: mongoose.Schema.Types.Number, required: true },
    type: { type: mongoose.Schema.Types.String },
    discountOffered: { type: mongoose.Schema.Types.Number, required: true },
    maxDiscountLimit: { type: mongoose.Schema.Types.Number },
    isDelete: { type: mongoose.Schema.Types.Boolean, default: false }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Coupons', couponSchema)


const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const VALIDATIONS = require('../validations/validations').VALIDATIONS
const adminModel = require('../models/admin.model')
const adminSessionModel = require("../models/admin.session.model")
const couponModel = require("../models/coupons.model")
const databaseService = require('../entity/baseEntity').databaseService
const crypto = require("crypto")
const Constants = require("../constants/constants").CONSTANTS
const jwt = require("jsonwebtoken")
const middlewares = require("../middlewares/middlewares").MIDDLEWARE
const { allCoupons } = require('../querybuilder')






router.post('/login',
    celebrate({
        body: {
            email: VALIDATIONS.EMAIL,
            password: VALIDATIONS.PASSWORD
        }
    }),
    async (req, res, next) => {
        try {
            let payload = req.body
            let alreadyExistingEmail = await databaseService.findOne(adminModel, { email: payload.email })
            console.log(alreadyExistingEmail)
            if (alreadyExistingEmail) {
                if (alreadyExistingEmail.password == crypto.createHmac('sha256', Constants.SALT).update(payload.password).digest('hex')) {
                    let sessionInDb = await databaseService.insert(adminSessionModel, { userId: alreadyExistingEmail._id, status: "active" })
                    let jwtData = await jwt.sign({ sessionId: sessionInDb._id }, Constants.SECRET_KEY)
                    console.log(jwtData)
                    alreadyExistingEmail.accessToken = jwtData
                    res.send({ httpCode: 200, status: 200, message: "LoggedIn Successfully", data: alreadyExistingEmail })
                } else res.send({ httpCode: 400, status: 400, message: "Invalid Password" })
            } else res.send({ httpCode: 400, status: 400, message: "Email not found" })
        } catch (err) {
            next(err)
        }
    })




router.post('/coupon',
    celebrate({
        body: {
            code: VALIDATIONS.CODE.required(),
            startDate: VALIDATIONS.START_DATE.required(),
            endDate: VALIDATIONS.END_DATE.required(),
            minAmountForApplicability: VALIDATIONS.MIN_AMOUNT_FOR_APPLICABILITY.required(),
            type: VALIDATIONS.COUPON_TYPE.required(),
            discountOffered: VALIDATIONS.DISCOUNT_OFFERED.required(),
            maxDiscountLimit: VALIDATIONS.MAX_DISCOUNT_LIMIT.when('type', { is: 'PERCENTAGE', then: Joi.required(), otherwise: Joi.valid(null) }) //for percentae discount coupon

        }
    }),
    // middlewares.VerifyAdminSession,
    async (req, res, next) => {
        try {
            let payload = req.body
            if (payload.startDate > new Date()) {
                if (payload.startDate <= payload.endDate) {
                    let existingCoupon = await databaseService.findOne(couponModel, { code: payload.code, endDate: { $gte: new Date() } })
                    if (!existingCoupon) {
                        databaseService.insert(couponModel, payload)
                        return res.send({ httpCode: 200, success: true, message: "Coupon added successfully" })
                    } else return res.send({ httpCode: 400, success: false, message: "Coupon with same code already exists" })

                } else return res.send({ httpCode: 400, success: false, message: "endDate should be greater than startDate" })
            } else return res.send({ httpCode: 400, success: false, message: "startDate should be greater than currentDate" })


        } catch (err) {
            next(err)
        }
    })

router.get('/coupon',
    celebrate({
        query: {
            page: VALIDATIONS.IMAGE,
            limit: VALIDATIONS.LIMIT

        }
    }),
    // middlewares.VerifyAdminSession,
    async (req, res, next) => {
        try {
            let payload = req.query;
            let pipeline = allCoupons(payload)
            let list = await databaseService.aggregate(couponModel, pipeline)
            return res.send({ httpCode: 200, status: 200, data: list })

        } catch (err) {
            next(err)
        }
    })


router.get('/applyCoupon',
    celebrate({
        query: {
            cartAmount: VALIDATIONS.AMOUNT.required(),
            couponCode: VALIDATIONS.CODE.required()

        }
    }),
    // middlewares.VerifyAdminSession,
    async (req, res, next) => {
        try {
            let payload = req.query;
            let existingCoupon = await databaseService.findOne(couponModel, { code: payload.couponCode })
            if (existingCoupon) {
                if (existingCoupon.startDate < new Date()) {
                    if (existingCoupon.endDate > new Date()) {
                        if (payload.cartAmount >= existingCoupon.minAmountForApplicability) {
                            switch (existingCoupon.type) {
                                case "FLAT":

                                    let discountOffered = (payload.cartAmount > existingCoupon.discountOffered) ? existingCoupon.discountOffered : payload.cartAmount
                                    return res.send({ httpCode: 200, status: 200, data: { discountOffered: discountOffered } })

                                case "PERCENTAGE":
                                    let discountPercentage = existingCoupon.discountOffered;
                                    let discountAmount = Math.floor((discountPercentage / 100) * payload.cartAmount)
                                    let discountToOffer = (discountAmount < existingCoupon.maxDiscountLimit) ? discountAmount : existingCoupon.maxDiscountLimit
                                    return res.send({ httpCode: 200, status: 200, data: { discountOffered: discountToOffer } })


                            }
                        } else return res.send({ httpCode: 400, status: 400, message: `Coupon is not applicable on carts with amount less than ${existingCoupon.minAmountForApplicability}` })
                    } else return res.send({ httpCode: 400, status: 400, message: "Coupon is expired" })
                } else return res.send({ httpCode: 400, status: 400, message: "Coupon is not applicale before its start Date" })

            } else return res.send({ httpCode: 400, status: 400, message: "Invalid coupon code" })


        } catch (err) {
            next(err)
        }
    })




module.exports = { router }
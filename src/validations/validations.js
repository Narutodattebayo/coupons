const { celebrate, Joi, errors, Segments } = require('celebrate');
const VALIDATIONS = {
    NAME: Joi.string().required(),
    EMAIL: Joi.string().required(),
    PASSWORD: Joi.string().required().min(5),
    PRODUCT_NAME: Joi.string().required(),
    PRODUCT_PRICE: Joi.number().min(1),
    PRODUCT_DESCRIPTION: Joi.string().optional(),
    PRODUCT_BRAND: Joi.string().required(),
    IMAGE: Joi.string().optional().allow("", null),
    PAGE: Joi.number().required().min(1),
    LIMIT: Joi.number().required().min(1),
    ID: Joi.string().regex(/^[a-f\d]{24}$/i),
    QUANTITY: Joi.number().min(1).required(),
    START_DATE: Joi.date().iso(),
    END_DATE: Joi.date().iso(),
    COUPON_TYPE: Joi.string().valid('FLAT', 'PERCENTAGE'),
    CODE: Joi.string().min(5).max(5),
    DISCOUNT_OFFERED: Joi.number().min(1),
    MAX_DISCOUNT_LIMIT: Joi.number(),
    MIN_AMOUNT_FOR_APPLICABILITY: Joi.number().min(0),
    AMOUNT:Joi.number().min(1).required()

}

module.exports = { VALIDATIONS }
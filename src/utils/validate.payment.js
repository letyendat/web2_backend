import Joi from 'joi';

function validateVerifyOtpPayment(data) {
    const schema = Joi.object({
        otp: Joi.string().required(),
        email: Joi.string().email().required(),
    }).unknown();
    return schema.validate(data);
}

function validateSendOtpMailPayment(data) {
    const schema = Joi.object({
        vehicleId: Joi.string().required(),
        name: Joi.string().min(2).max(30).required(),
        address: Joi.string().min(2).max(30).required(),
        citizen_identification: Joi.string().min(2).max(10).required(),
        birthday: Joi.date(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(10),

    }).unknown();
    return schema.validate(data);
}
export default {
    validateVerifyOtpPayment,
    validateSendOtpMailPayment,
}
import Joi from 'joi';

function validateAccountAdmin(data) {
    const schema = Joi.object({
        userName: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().required()

    }).unknown();
    return schema.validate(data);
}
export default {
    validateAccountAdmin
}
import Joi from 'joi';

function validateCreateVehicle(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        image_url: Joi.array().items(Joi.string()).required(),
        status: Joi.string().valid('old', 'new').required(),
        description: Joi.string().required(),
        purpose: Joi.number().valid(0, 1).required(),
        type: Joi.number().valid(0, 1, 2).required(),
        price: Joi.number().required(),
        license_plates: Joi.string().when('status', {
            is: 'old',
            then: Joi.string().required()
        })

    }).unknown();
    return schema.validate(data);
}
export default {
    validateCreateVehicle
}
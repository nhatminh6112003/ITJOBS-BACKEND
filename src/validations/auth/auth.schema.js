import Joi from "joi"

const schema = {
    register:Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password:Joi.string().min(8).required(),
        user_type_id:Joi.number().required(),
    })
}

export default schema
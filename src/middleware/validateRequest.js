import ValidationError from '@src/errors/ValidationError';
import asyncHandler from 'express-async-handler';

const validateRequest = (schema) =>
	asyncHandler(async (req, res, next) => {
		const { error } = await schema.validate(req.body, { abortEarly: false });
		if (error) throw new ValidationError(error.details);
		next();
	});
export default validateRequest;

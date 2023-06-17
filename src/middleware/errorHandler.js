const errorHandler = (err, req, res, next) => {
	err.statusCode = err?.statusCode || 500;
	const messageError = err?.messageObject || err.message;

	return res.status(err.statusCode).json({
		isSuccess: false,
		message: messageError,
		status: err.statusCode,
		data: []
	});
};
export default errorHandler;

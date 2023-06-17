class ValidationError extends Error {
	constructor(message) {
		super();
		this.statusCode = 422;
		this.messageObject = message;
	}
}
export default ValidationError;

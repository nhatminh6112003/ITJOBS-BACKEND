// Tạo middleware để xử lý việc trả về dữ liệu API
import responseStatus from '@src/constants/responseStatus';
const apiResponse = (req, res, next) => {
	res.apiResponse = function (data = [], statusObj = responseStatus.SUCCESS) {
		const response = {
			...statusObj,
			data: data
		};
		const statusCode = response.status || 200;

		return res.status(statusCode).json(response);
	};

	next();
};
export default apiResponse;

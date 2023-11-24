// Tạo middleware để xử lý việc trả về dữ liệu API
import responseStatus from '../constants/responseStatus';

const apiResponse = (req, res, next) => {
	// eslint-disable-next-line default-param-last, func-names
	res.apiResponse = function (data = [], pagination, statusObj = responseStatus.SUCCESS) {
		const response = {
			...statusObj,
			data,
			pagination
		};

		const statusCode = response.status || 200;

		return res.status(statusCode).json(response);
	};

	next();
};
export default apiResponse;

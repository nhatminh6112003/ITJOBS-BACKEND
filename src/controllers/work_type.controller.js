import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import workTypeService from '@src/services/work_type.service';

const workTypeController = {
	async getAll(req, res) {
		const data = await workTypeService.getAll();
		return res.apiResponse(data);
	}
};
export default asyncHandlerDecorator(workTypeController);

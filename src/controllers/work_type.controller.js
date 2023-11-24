import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import workTypeService from '../services/work_type.service';

const workTypeController = {
	async getAll(req, res) {
		const data = await workTypeService.getAll();
		return res.apiResponse(data);
	}
};
export default asyncHandlerDecorator(workTypeController);

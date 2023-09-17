import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import jobPositionCategoryService from '@src/services/job_position_category.service';

const jobPositionCategoryController = {
	async create(req, res) {
		const data = req.body;
		const handleCreate = await jobPositionCategoryService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await jobPositionCategoryService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await jobPositionCategoryService.getOne(id);
		return res.apiResponse(data);
	},

	async delete(req, res) {
		const { id } = req.params;
		await jobPositionCategoryService.delete(id);
		return res.apiResponse();
	}

};

export default asyncHandlerDecorator(jobPositionCategoryController);
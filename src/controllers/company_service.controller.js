import moment from 'moment';
import asyncHandlerDecorator from '../helpers/asyncHandlerDecorator';
import company_serviceService from '../services/company_service.service';
import service_benefitsService from '../services/service_benefits.service';
import { service } from '../models';

const companyServiceController = {
	async getAll(req, res) {
		const { query } = req;
		const data = await company_serviceService.getAll(query);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await company_serviceService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await company_serviceService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		if (data.isActive === true) {
			// eslint-disable-next-line no-inner-declarations
			function getday(item) {
				const words = item.benefit.name.split(' ');
				const secondFromEnd = words.length >= 2 ? words[words.length - 2] : null;
				return parseInt(secondFromEnd, 10);
			}
			const service_benefits = await service_benefitsService.getAllByServiceId(data.service_id);
			const newData = service_benefits.map(getday);
			const numbersOnly = newData.filter((value) => typeof value === 'number' && !Number.isNaN(value));
			if (!numbersOnly[0]) {
				const service_data = await service.findOne({
					where: {
						id: data.service_id
					},
					raw: true,
					nest:true
				});

				const updateIsActive = await company_serviceService.updateByIsActive(service_data?.service_type_id);
				const company_service_data = await company_serviceService.getOne(id);

				if (company_service_data?.register_date && company_service_data?.expiration_date) {
					const handleUpdate = await company_serviceService.update(id, {
						isActive: data.isActive
					});
					return res.apiResponse(handleUpdate);
				}

				const handleUpdate = await company_serviceService.update(id, {
					isActive: data.isActive,
					register_date: data.register_date,
					expiration_date: data.expiration_date
				});
				return res.apiResponse(handleUpdate);
			}
			const now = moment();
			const priority_expiry_date = now.add(numbersOnly[0], 'days').format('YYYY-MM-DD');
			
			const service_data = await service.findOne({
				where: {
					id: data.service_id
				},
				raw: true,
				nest:true
			});

			const updateIsActive = await company_serviceService.updateByIsActive(service_data?.service_type_id);
			console.log(1, updateIsActive);
			const company_service_data = await company_serviceService.getOne(id);
			if (company_service_data?.register_date && company_service_data?.expiration_date) {
				const handleUpdate = await company_serviceService.update(id, {
					isActive: data.isActive
				});
				return res.apiResponse(handleUpdate);
			}

			const handleUpdate = await company_serviceService.update(id, {
				isActive: data.isActive,
				register_date: data.register_date,
				expiration_date: data.expiration_date,
				priority: true,
				priority_expiry_date,
				priority_level: 0
			});
			return res.apiResponse(handleUpdate);
		}
		const handleUpdate = await company_serviceService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await company_serviceService.delete(id);
		return res.apiResponse();
	},
	async analysis(req, res) {
		const { id } = req.params;
		const data = await company_serviceService.analysis(id);
		return res.apiResponse(data);
	}
};

export default asyncHandlerDecorator(companyServiceController);

import createError from 'http-errors';


// CREATE
export const findByPkAndCreate = async (model, id, data) => {
	const record = await model.findByPk(id);
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	const createdRecord = await model.create(data);
	return createdRecord;
};

export const findOneAndCreate = async (model, conditions, data) => {
	const record = await model.findOne({ where: conditions });
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	const createdRecord = await model.create(data);
	return createdRecord;
};

// UPDATE
export const findByPkAndUpdate = async (model, id, data) => {
	const record = await model.findByPk(id);
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	await record.update(data);
	return record;
};

export const findOneAndUpdate = async (model, conditions, data) => {
	const record = await model.findOne({ where: conditions });
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	await record.update(data);
	return record;
};

// DELETE
export const findByIdAndDelete = async (model, id, data) => {
	const record = await model.findOne({ where: { id } });
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	await record.update(data);
	return record;
};
export const findByPkAndDelete = async (model, id) => {
	const record = await model.findByPk(id);
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	await record.destroy();
	return record;
};

export const findOneAndDelete = async (model, conditions) => {
	const record = await model.findOne({ where: conditions });
	if (!record) throw createError(409, 'Không tìm thấy bản ghi');
	await record.destroy();
	return record;
};

// export const handlePaginate = async ({ model, page, limit, keyword }) => {
// 	const searchPattern = `%${keyword}%`;
// 	if (limit < 1) {
// 		// Trường hợp không giới hạn số lượng bản ghi trả về
// 		const result = await model.findAll({
// 			where: { name: { [Op.like]: searchPattern } }
// 		});

// 		return [result, null]; // Trả về tất cả bản ghi và không có thông tin phân trang
// 	}
// 	const options = {
// 		page, // Default 1
// 		paginate: limit, // Default 25
// 		where: { name: { [Op.like]: searchPattern } }
// 	};

// 	const { docs: data, pages: totalPages, total: totalItems } = await model.paginate(options);

// 	const pagination = { totalPages, totalItems, itemsPerPage: limit, pageIndex: page };
// 	return [data, pagination];
// };

export async function handlePaginate({ model, page, limit, query = {} }) {


	const queries = {
		offset: (page - 1) * limit,
		limit
	};

	const data = await model.findAndCountAll({
		where: query,
		...queries
	});

	const pagination = {
		totalPages: Math.ceil(data.count / limit),
		totalItems: data?.count,
		itemsPerPage: limit,
		pageIndex: page
	};

	return [data.rows, pagination];
}

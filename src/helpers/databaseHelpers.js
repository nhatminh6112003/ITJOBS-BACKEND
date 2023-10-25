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

// export async function handlePaginate({ model, page, limit, condition = {}, queries }) {

// 	const data = await model.findAndCountAll({
// 		where: condition,
// 		...{
// 			offset: (page - 1) * limit,
// 			limit,
// 			...queries
// 		}
// 	});

// 	const pagination = {
// 		totalPages: Math.ceil(data.count / limit),
// 		totalItems: data?.count,
// 		itemsPerPage: limit,
// 		pageIndex: page
// 	};

// 	return [data.rows, pagination];
// }

export async function handlePaginate({ model, page, limit, condition = {}, queries }) {
	if (limit < 1) {
		const data = await model.findAndCountAll({
			where: condition,
			...{
				...queries
			}
		});

		const pagination = {
			totalPages: 1, // Tất cả dữ liệu nằm trong 1 trang
			totalItems: data?.count,
			itemsPerPage: data?.count, // Số lượng bản ghi
			pageIndex: 1 // Trang đầu tiên
		};

		return [data.rows];
	}
	if (limit === 1) {
		const data = await model.findOne({
			where: condition,
			...queries
		});

		// Trong trường hợp này, dữ liệu sẽ là một bản ghi duy nhất
		return [data, null];
	}
	const data = await model.findAndCountAll({
		where: condition,
		...{
			offset: (page - 1) * limit,
			limit,
			...queries
		}
	});

	const pagination = {
		totalPages: Math.ceil(data.count / limit),
		totalItems: data?.count,
		itemsPerPage: limit,
		pageIndex: page
	};

	return [data.rows, pagination];
}

import createError from 'http-errors';

export const findByPkAndUpdate = async (model, id, data) => {
	try {
		// tìm theo primary key
		const record = await model.findByPk(id);
		if (!record) throw createError(409, 'Không tìm thấy bản ghi');
		await record.update(data);
		return record;
	} catch (error) {
		throw error;
	}
};
export const findOneAndUpdate = async (model, conditions, data) => {
	try {
		const record = await model.findOne({ where: conditions });
		if (!record) throw createError(409, 'Không tìm thấy bản ghi');
		await record.update(data);
		return record;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const findByPkAndDelete = async (model, id) => {
	try {
		// Tìm theo primary key
		const record = await model.findByPk(id);
		if (!record) throw createError(409, 'Không tìm thấy bản ghi');
		await record.destroy();
		return record;
	} catch (error) {
		throw error;
	}
};

export const findOneAndDelete = async (model, conditions) => {
	try {
		// Tìm bản ghi đầu tiên theo điều kiện
		const record = await model.findOne({ where: conditions });
		if (!record) throw createError(409, 'Không tìm thấy bản ghi');
		await record.destroy();
		return record;
	} catch (error) {
		throw error;
	}
};

import asyncHandlerDecorator from '@src/helpers/asyncHandlerDecorator';
import serviceService from '@src/services/service.service';
import moment from 'moment/moment';
import sortObject from '@src/helpers/sortObject';

const serviceController = {
	async getAll(req, res) {
		const { query } = req;
		const [data, pagination] = await serviceService.getAll(query);
		return res.apiResponse(data, pagination);
	},

	async getAllByServiceType(req, res) {
		const { service_type_id } = req.params;
		const data = await serviceService.getAllByServiceType(service_type_id);
		return res.apiResponse(data);
	},

	async getOne(req, res) {
		const { id } = req.params;
		const data = await serviceService.getOne(id);
		return res.apiResponse(data);
	},

	async create(req, res) {
		const data = req.body;
		const handleCreate = await serviceService.create(data);
		return res.apiResponse(handleCreate);
	},

	async update(req, res) {
		const data = req.body;
		const { id } = req.params;
		const handleUpdate = await serviceService.update(id, data);
		return res.apiResponse(handleUpdate);
	},

	async delete(req, res) {
		const { id } = req.params;
		await serviceService.delete(id);
		return res.apiResponse();
	},

	async createPaymentUrl(req, res) {
		process.env.TZ = 'Asia/Ho_Chi_Minh';

		const date = new Date();
		const createDate = moment(date).format('YYYYMMDDHHmmss');

		const ipAddr =
			req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;

		const tmnCode = 'S6RTTAYA';
		const secretKey = 'ZAHBMWCSUGVMVKEQCWQRWFBZXXKNUQYC';
		let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
		const returnUrl = 'http://localhost:3000/employers/vnpay_return';
		const orderId = moment(date).format('DDHHmmss');
		const { amount } = req.body;
		const { bankCode } = req.body;
		const { info } = req.body;
		let locale = req.body.language;
		if (locale === null || locale === '') {
			locale = 'vn';
		}
		const currCode = 'VND';
		let vnp_Params = {};
		vnp_Params.vnp_Version = '2.1.0';
		vnp_Params.vnp_Command = 'pay';
		vnp_Params.vnp_TmnCode = tmnCode;
		vnp_Params.vnp_Locale = locale;
		vnp_Params.vnp_CurrCode = currCode;
		vnp_Params.vnp_TxnRef = orderId;
		vnp_Params.vnp_OrderInfo = info;
		vnp_Params.vnp_OrderType = 'other';
		vnp_Params.vnp_Amount = amount * 100;
		vnp_Params.vnp_ReturnUrl = returnUrl;
		vnp_Params.vnp_IpAddr = ipAddr;
		vnp_Params.vnp_CreateDate = createDate;
		if (bankCode !== undefined && bankCode !== '') {
			vnp_Params.vnp_BankCode = bankCode;
		}
		vnp_Params = sortObject(vnp_Params);

		// eslint-disable-next-line global-require
		const querystring = require('qs');
		const signData = querystring.stringify(vnp_Params, { encode: false });
		// eslint-disable-next-line global-require
		const crypto = require('crypto');
		const hmac = crypto.createHmac('sha512', secretKey);
		// eslint-disable-next-line no-buffer-constructor
		const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
		vnp_Params.vnp_SecureHash = signed;
		vnpUrl += `?${querystring.stringify(vnp_Params, { encode: false })}`;
		console.log(vnpUrl);
		return res.apiResponse(vnpUrl);
	}
};

export default asyncHandlerDecorator(serviceController);

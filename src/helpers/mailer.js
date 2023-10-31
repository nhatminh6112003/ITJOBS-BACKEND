// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';
import mailConfig from '@src/config/mailConfig';

const sendMail = (to, subject, htmlContent) => {
	const transport = nodemailer.createTransport({
		host: mailConfig.HOST,
		port: mailConfig.PORT,
		secure: false,
		auth: {
			user: mailConfig.USERNAME,
			pass: mailConfig.PASSWORD
		}
	});
	const options = {
		from: mailConfig.FROM_ADDRESS,
		to,
		subject,
		html: htmlContent
	};
	return transport.sendMail(options);
};
export default sendMail;

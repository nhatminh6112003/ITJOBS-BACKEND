import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import * as path from 'path';
import { connectDb } from './config/connectDB.js';
import apiResponse from './middleware/apiResponse.js';
import errorHandler from './middleware/errorHandler.js';
import route from './routes/index.js';
import cronJob from './cron-job/cron-job.js';

const app = express();
cronJob();

app.use(cookieParser());
app.use(
	cors({
		origin: ['http://127.0.0.1:5173', 'http://localhost:3000', 'https://app-job-hunters.vercel.app'],
		credentials: true,
		optionsSuccessStatus: 200
	})
);

app.use(
	compression({
		level: 6,
		threshold: 100 * 1000
	})
);

// cấp quyền để truy cập tài nguyên
app.use(apiResponse);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(helmet())
app.use(morgan('combined'));
// đường dẫn của dự án
route(app);

app.get('/api/uploads/:fileName', (req, res) => {
	const { fileName } = req.params;
	res.sendFile(path.join(__dirname, 'uploads', fileName));
});

app.all('*', (req, res, next) => {
	const err = new Error('The route can not be found');
	err.statusCode = 404;
	next(err);
});

app.use(errorHandler);
connectDb();

export default app;

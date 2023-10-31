import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const { PORT } = process.env;
app.listen(PORT, () => {
	console.log(`Example app listening on port http://localhost:${PORT}`);
});

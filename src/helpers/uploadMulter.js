import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(__dirname);
		const uploadDir = path.join(__dirname, '../uploads'); // Đường dẫn tới thư mục uploads trong thư mục src
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()  }-${  Math.round(Math.random() * 1e9)}`;
		cb(null, `${file.originalname}_${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
	}
});  

const uploadMulter = multer({ storage });

export default uploadMulter;

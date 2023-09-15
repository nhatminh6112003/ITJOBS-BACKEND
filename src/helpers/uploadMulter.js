import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(__dirname);
		const uploadDir = path.join(__dirname, '../uploads'); // Đường dẫn tới thư mục uploads trong thư mục src
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
        const fileNameWithoutExtension = file.originalname.split(".")[0];
        const extension = path.extname(file.originalname);
		const timestamp = Date.now();
		const newFilename = `${fileNameWithoutExtension}_${timestamp}${extension}`; 
		cb(null, newFilename);
	}
});

const uploadMulter = multer({ storage });

export default uploadMulter;

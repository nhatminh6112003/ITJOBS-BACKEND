import dotenv from 'dotenv';
dotenv.config();
const cloudinary = require('cloudinary').v2;
import CloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret
});
const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png', 'jpeg'],
	params: {
		folder: 'itjobs_image_folder'
	}
});

const uploadCloud = multer({ storage });
export default uploadCloud;

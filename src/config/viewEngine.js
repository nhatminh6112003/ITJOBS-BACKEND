import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

function configViewEngine(app) {
	const __dirname = path.dirname(__filename);

	app.use(express.static(path.join(__dirname, '../public')));

	app.set('view engine', 'hbs');
	app.set('views', path.join(__dirname, '../views'));
}
export default configViewEngine;

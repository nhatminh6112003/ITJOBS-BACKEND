#!/usr/bin/env node
// eslint-disable-next-line import/no-extraneous-dependencies
const yargs = require('yargs/yargs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { hideBin } = require('yargs/helpers');
const fs = require('fs');

// eslint-disable-next-line prefer-destructuring
const argv = yargs(hideBin(process.argv)).argv;
const { name } = argv;

function updateFileIndexRoute() {
	const routeFilePath = 'src/routes/index.js';
	const newImportStatement = `import ${name}Routes from './${name}.route.js';`;
	const newApiRoute = `apiRoutes.use('/${name}', ${name}Routes);`;
	fs.readFile(routeFilePath, 'utf8', (err, data) => {
		if (err) {
			console.error(`Lỗi khi đọc tệp route: ${err}`);
			return;
		}

		const lastImportIndex = data.lastIndexOf('import ', data.lastIndexOf('import '));

		if (lastImportIndex !== -1) {
			// Tìm vị trí cuối cùng của dấu chấm phẩy (;) sau import statement
			const lastSemicolonIndex = data.indexOf(';', lastImportIndex);

			// Thêm import statement mới vào cuối danh sách import
			if (lastSemicolonIndex !== -1) {
				const insertIndex = lastSemicolonIndex + 1;
				data = `${data.slice(0, insertIndex)}\n${newImportStatement}${data.slice(insertIndex)}`;
			}
		}

		const lastApiRouteIndex = data.lastIndexOf('apiRoutes.use(');

		if (lastApiRouteIndex !== -1) {
			const lastSemicolonIndex = data.indexOf(';', lastApiRouteIndex);
			if (lastSemicolonIndex !== -1) {
				const insertIndex = lastSemicolonIndex + 1;
				data = `${data.slice(0, insertIndex)}\n${newApiRoute}${data.slice(insertIndex)}`;
			}
		}

		// Ghi dữ liệu đã cập nhật trở lại vào tệp route
		fs.writeFile(routeFilePath, data, 'utf8', (error) => {
			if (error) {
				console.error(`Lỗi khi ghi lại tệp route: ${error}`);
				return;
			}
			console.log('Đã cập nhật tệp route thành công');
		});
	});
}

function createController() {
	try {
		fs.readFileSync(`src/controllers/${name}.controller.js`);

		console.log('Controller đã tồn tại');
	} catch (e) {
		const template = fs.readFileSync('bin/templates/controller.tpl', 'utf8'); // Đảm bảo đọc dưới dạng utf8
		const modifiedTemplate = template.replace(/{{controllerName}}/g, name);
		fs.writeFileSync(`src/controllers/${name}.controller.js`, modifiedTemplate, {
			flag: 'w+'
		});
		console.log('Tạo Controller thành công');
	}
}

function createRoute() {
	try {
		fs.readFileSync(`src/routes/${name}.route.js`);
		console.log('Route đã tồn tại');
	} catch (e) {
		const template = fs.readFileSync('bin/templates/route.tpl', 'utf8');
		const modifiedTemplate = template.replace(/{{controllerName}}/g, name);
		fs.writeFileSync(`src/routes/${name}.route.js`, modifiedTemplate, {
			flag: 'w+'
		});

		console.log('Tạo Route thành công');
		updateFileIndexRoute(name);
	}
}

function createService() {
	try {
		fs.readFileSync(`src/services/${name}.route.js`);
		console.log('Service đã tồn tại');
	} catch (e) {
		const template = fs.readFileSync('bin/templates/service.tpl', 'utf8');
		const modifiedTemplate = template.replace(/{{serviceName}}/g, name);
		fs.writeFileSync(`src/services/${name}.service.js`, modifiedTemplate, {
			flag: 'w+'
		});
		console.log('Tạo Service thành công');
	}
}

createController();
createRoute();
createService();

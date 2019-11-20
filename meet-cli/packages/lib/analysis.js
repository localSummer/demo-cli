const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const filetype = require('./filetype');

function analysisAssets(dir) {
	let assets = {
		html: 0,
		js: 0,
		css: 0,
		image: 0,
		media: 0,
		other: 0
	};

	function readAndCountFile(dirPath) {
		let files = fs.readdirSync(dirPath);

		files.forEach(file => {
			let curPath = `${dirPath}/${file}`;
			let stat = fs.statSync(curPath);
			if (stat.isDirectory()) {
				readAndCountFile(curPath);
			} else {
				let ext = fs.extname(file);
				assets[fileType(ext)] += stat.size / 1000;
			}
		});
	}

	readAndCountFile(dir);

	return assets;
}

function renderChart(assetsData) {
	let blessed = require('blessed');
	let contrib = require('blessed-contrib');
	let screen = blessed.screen();

	let titles = [],
		data = [],
		total = 0;

	for (let item in assetsData) {
		titles.push(item);
		data.push(assetsData[item].toFixed(1));
		total += assetsData[item];
	}

	let bar = contrib.bar({
		label: chalk.blue('total assets size is : ') + chalk.yellow(`${total.toFixed(2)} kb`) + chalk.blue('. The details are as follows (kb): \n'),
		barWidth: 8,
		barSpacing: 10,
		xOffset: 5,
		maxHeight: 7,
		barBgColor: 'green',
		barFgColor: 'red'
	});

	screen.append(bar); // must append before setting data

	bar.setData({
		titles,
		data,
	});

	screen.render();
}

module.exports = function (dir) {
	let data = analysisAssets(dir);
	renderChart(data);
}
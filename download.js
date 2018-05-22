const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const downloadPage = (url = 'http://nodeprogram.com') => {
	const fetchPage = (urlF, callback) => {
		http.get(urlF, (res) => {
			let buff = '';
			res.on('data', (chunk) => {
				buff += chunk;
			})
			res.on('end', () => {
				callback(null, buff);
			})
		}).on('error', (err) => {
			console.error(`Error: ${err.message}`);
			callback(err);
		})
	}

	const folderName = uuidv1();
	fs.mkdirSync(folderName);

	fetchPage(url, (err, data) => {
		if(err) return console.log(err);
		fs.writeFileSync(path.join(__dirname, folderName, 'data.html'), data);
		fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
		console.log('Website downloaded in ', folderName)
	})
}

downloadPage(process.argv[2])
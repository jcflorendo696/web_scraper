const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');


//	Write Headers
writeStream.write(`Title, Link, Date \n`);

//	URL of site
request('http://blog.jcflorendo.com/', function( error, res, html ){
	
	if( !error && res.statusCode == 200 ){
		const $ = cheerio.load(html);
		const title = "";

		$("#post-2563-0-0-0 .post").each( (i, item) => {

			const title = $(item).find(".post-title").text();
			const author = $(item).find(".post-author").text();
			const date = $(item).find(".post-date").text().replace(/\s\s+/g, ' ');
			const category = $(item).find(".post-category").text();
			const exerpt = $(item).find(".entry-content p:first-child").text();

			//	Write Row to CSV
			writeStream.write(`${title}, ${author}, ${date} \n`);
		});
			

		console.log("Scraping Done.");
	}

	
});
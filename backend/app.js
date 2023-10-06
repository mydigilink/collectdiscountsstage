const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const { promisify } = require('util');
const dl = require('./id.js');//Download image 
const writeFileAsync = promisify(fs.writeFile);
const request = require('request');

const sql = require('mssql');
const sqlConfig = {
    user: 'cd_user',
    password: '0f99Ej@f1',
    database: 'cDiscount',
    server: '85.25.185.85',
    port: 5757,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }
async function webScraper() {
    var resultObject = {};

	const browser = await puppeteer.launch({})
	const page = await browser.newPage()
	await page.goto(
'https://www.grabon.in/stores/')
 // Define a selector for the <ul> element
 const ulSelector = 'ul.gall-catall'; // Replace with the actual CSS selector for your <ul> element

 // Extract data from the <ul> element
 const listData = await page.evaluate((ulSelector) => {
    const data=[];
   const ul = document.querySelector(ulSelector);
   if (!ul) {
     return null; // If the <ul> element is not found, return null
   }
  

 const items_ = Array.from(ul.querySelectorAll('li')).map(li =>  li.querySelector('strong').textContent
    // {    li.querySelector('strong').textContent,li.querySelector('a').getAttribute("href").trim()} 
 
 );
 console.log(items_+"--");
// const itemshref = Array.from(ul.querySelectorAll('li a')).map((li) => li.getAttribute("href").trim());
   return items_
 //return items_[{text,value}];
}, ulSelector);
const listDatahref = await page.evaluate((ulSelector) => {
    const data=[];
   const ul = document.querySelector(ulSelector);
   if (!ul) {
     return null; // If the <ul> element is not found, return null
   }
  

 const items_ = Array.from(ul.querySelectorAll('li')).map(li =>  li.querySelector('a').getAttribute("href").trim()
    // {    li.querySelector('strong').textContent,li.querySelector('a').getAttribute("href").trim()} 
 
 );
 //console.log(items_+"--");
// const itemshref = Array.from(ul.querySelectorAll('li a')).map((li) => li.getAttribute("href").trim());
   return items_
 //return items_[{text,value}];
}, ulSelector);
 const result = [];

// for (let i = 0; i < listData.length; i++) {
//   result["list"].push([listData[i], listDatahref[i] ]);
// }
console.log(result);
// Print the scraped data
 if (listDatahref) {
   console.log('List Items:');
   console.log(listDatahref);
   for (let i = 0; i < listDatahref.length; i++) {
  //  setTimeout(function(){uriGetImg(listDatahref[i]);},i*2000)
  //console.log(listDatahref[i], listData[i]);
  
  
  storeData( listData[i],listDatahref[i]);
    }
   
 } else {
   console.log('UL element not found on the page.');
 }
 // Print the scraped data
//  if (listData) {
//    console.log('List Items:');
//    console.log(listData);
//  } else {
//    console.log('UL element not found on the page.');
//  }

	// let element = await page.$(".gall-catall li")
	// let text = await page.evaluate(
	// 	element => element.textContent, element)
	// console.log(text)
	browser.close()
};


function uriGetImg(uri_path){
    (async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        const url = uri_path;//'https://www.grabon.in/makemytrip-coupons/'; // Replace with the URL of the website you want to scrape.
        await page.goto(url);
        
        // You may need to adjust the selector to match the structure of the website you're scraping.
        const imageUrls = await page.$$eval('.gm-mri img', (images) => {
          return images.map((img) => img.getAttribute('src'));
        });
        //console.log(imageUrls);
         for (const imageUrl of imageUrls) {
            console.log(`Downloaded: `+ imageUrl,imageUrl.split("/")[imageUrl.split("/").length -1]);
            downloadImage(imageUrl,"./downloads/"+imageUrl.split("/")[imageUrl.split("/").length -1])
         }
        
        
        await browser.close();
      } catch (error) {
        console.error('An error occurred:', error);
      }
    })();
    }
    function downloadImage(url, destination) {
    
        request(url)
      
          .pipe(fs.createWriteStream(destination))
      
          .on('close', () => {
      
            console.log('Image downloaded successfully!');
      
          })
      
          .on('error', (err) => {
      
            console.error('Error downloading the image:', err);
      
          });
      
      }
      
webScraper();
async function storeData(v1,v2) {
    (async () => {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          
          const url = v2;//'https://www.grabon.in/makemytrip-coupons/'; // Replace with the URL of the website you want to scrape.
          await page.goto(url);
          
          // You may need to adjust the selector to match the structure of the website you're scraping.
          const imageUrls = await page.$$eval('.gm-mri img', (images) => {
            return images.map((img) => img.getAttribute('src'));
          });
          //console.log(imageUrls);
           for (const imageUrl of imageUrls) {
              console.log(`Downloaded: `+ v1,imageUrl.split("/")[imageUrl.split("/").length -1]);
             // downloadImage(imageUrl,"./downloads/"+imageUrl.split("/")[imageUrl.split("/").length -1])
           }
          
          
          await browser.close();
        } catch (error) {
          console.error('An error occurred:', error);
        }
      })();
//console.log(v1,v2.split("/")[0])

}
    async function storeData_(v1,v2) {
    try {
      // Connect to the database
      await sql.connect(sqlConfig);
  
      // Define your SQL query
      const query = "INSERT INTO merchant_logo (name, img) VALUES (@Value1, @Value2)";
  
      // Create a request object
      const request = new sql.Request();
  
      // Add parameters to your query
      request.input('Value1', sql.VarChar, v1);
      request.input('Value2', sql.VarChar, v2);
  
      // Execute the query
      const result = await request.query(query);
  
      // Print the result
      console.log('Data inserted successfully:', result);
  
      // Close the connection
      sql.close();
    } catch (err) {
      // Handle errors
      console.error('Error:', err);
    }
  }
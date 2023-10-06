const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const { promisify } = require('util');
const dl = require('./id.js');//Download image 
const writeFileAsync = promisify(fs.writeFile);
const request = require('request');


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
  
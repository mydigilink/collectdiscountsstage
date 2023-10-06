const request = require('request');

const fs = require('fs');



//downloadImage("https://cdn.grabon.in/gograbon/images/merchant/1620803829927/makemytrip-logo.jpg","./downloads/makemytrip-logo.jpg");
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



module.exports = downloadImage;

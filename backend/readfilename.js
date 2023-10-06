const fs = require('fs');
const path = require('path');

const sql = require('mssql');

const sqlConfig = {
    user: 'cd_user',
    password: '0f99Ej@f1',
    database: 'cDiscount',
    server: '85.25.185.85',
    port: 5757,
    pool: {
      max: 10000000,
      min: 0,
      idleTimeoutMillis: 300000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }
const folderPath = './downloads'; // Replace with the actual path to your image folder

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter the files to get only image file names (you can customize this filter)
  const imageFiles = files.filter(file => {
    const extname = path.extname(file);
    //return ['.jpg', '.jpeg', '.png', '.gif', '.bmp','.jfif','.webp'].includes(extname.toLowerCase());
    return (extname.toLowerCase());
  });

  // Print the image file names
  console.log('Image Files:');
  imageFiles.forEach(fileName => {
    setTimeout(function(){   storeData(fileName.replace(/\.[^/.]+$/, "").replace("-logo", "").replace("-", " ")[0].toUpperCase() + fileName.replace(/\.[^/.]+$/, "").replace("-logo", "").slice(1)    ,fileName);
},10)
  });
});

async function storeData(v1,v2) {
    try {
      // Connect to the database
      await sql.connect(sqlConfig);
  
      // Define your SQL query
      const query ="EXEC PROCE_MLOGO @Action='INSERT',@output=1, @name = @Value1 , @img=@Value2";// "INSERT INTO merchant_logo (name, img) VALUES (@Value1, @Value2)";
  
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
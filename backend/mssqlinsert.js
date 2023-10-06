
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
 

async function storeData() {
    try {
      // Connect to the database
      await sql.connect(sqlConfig);
  
      // Define your SQL query
      const query = "INSERT INTO merchant_logo (name, img) VALUES (@Value1, @Value2)";
  
      // Create a request object
      const request = new sql.Request();
  
      // Add parameters to your query
      request.input('Value1', sql.VarChar, 'Value1s');
      request.input('Value2', sql.VarChar, 'Value2s');
  
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
  
  storeData();
  
// async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect('server=85.25.185.85,5757; Network Library = dbmssocn;  Integrated Security = no; Uid=cd_user; Pwd=0f99Ej@f1; Encrypt = no; ;Connect Timeout=200; pooling=\'true\'; Max Pool Size=200; Initial Catalog=cDiscount')
//         //const result = await sql.query`select * from country where id = ${value}`
//         const result = await sql.query`select * from country `
//         console.log(result)
//     } catch (err) {
//         console.log(err)
//         // ... error checks
//     }
// }
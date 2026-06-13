//  server.js
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const http=require('http');
const app=require('./app');
const server=http.createServer(app);


server.listen(5000,console.log("Server started..."))

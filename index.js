import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import app from './app.js'
 dotenv.config({ path: "backend/config/config.env" });



const PORT = process.env.PORT


mongoose.set('strictQuery', false);

// mongoose.connect( DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
//     .catch((err) => console.log(err.message))
console.log(process.env.CONNECTION_URL)

  mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true})
  .then((data)=>{console.log(`mongo db connected with server ${data.connection.host}`)})
  


const server=app.listen(process.env.PORT, () => {
  console.log("Server is running on  http://localhost:" + process.env.PORT);
});

//Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error : ${err.message}`);
  console.log('Shutting down the server due to Unhandled promise  Rejection');
  
  server.close(()=>{
    process.exit(1);
  });
});



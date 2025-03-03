const moongoose = require("mongoose");
require("dotenv").config()

const db_conn = moongoose.connect(process.env.MONGODB_URL)
.then(()=>{
console.log("Connected to MongoDB")
})
.catch((err)=>{
console.log(err)
console.log("Error connecting to MongoDB")
})
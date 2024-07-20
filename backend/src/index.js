const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
//In an Express.js application,
// the app.use(express.urlencoded({ extended: true })); 
//middleware is used to parse incoming requests with URL - encoded payloads.
//This is particularly useful when you're handling form submissions.
app.use(express.urlencoded({ extended: true }));
// makes secure connections of backend and frontend server 
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/api/test", async (req, res) => {
    res.json({ message: "hello from express endpoint" });
})


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("database is connected successfully!")
    
    }
    catch(err){
        console.log(err)
    }
}





app.listen(PORT,()=>{
    connectDB();
    console.log("app is running on port " + PORT);
})
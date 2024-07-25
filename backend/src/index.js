
const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("database is connected successfully!")
    
    }
    catch(err){
        console.log(err)
    }
}

const PORT = process.env.PORT || 8080;
//In an Express.js application,
// the app.use(express.urlencoded({ extended: true })); 
//middleware is used to parse incoming requests with URL - encoded payloads.
//This is particularly useful when you're handling form submissions.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// makes secure connections of backend and frontend server 
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.body);
    next();
});

// const checkAuth = (req, res, next) => {
//     const isAuthenticated = verifyToken(req.cookies.token);
//     if (isAuthenticated) {
//         next();
//     }
//     else { 
//         res.render('/sign-in');
//     }
// }

// app.get('/', checkAuth);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log("app is running on port " + PORT);
})
const express = require('express');
const app = express();
const cors=require('cors');
require('dotenv').config();
const PORT=process.env.PORT;
const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));

app.use(express.json())

//database
require('./config/dbConnection')
const mongoose = require('mongoose');

//routes
const users=require('./routes/users')
const courses=require('./routes/courses')
const authRoutes=require('./routes/authRoutes')
const profileRoutes=require('./routes/profileRoutes')

app.use('/api/', users);
app.use('/api/auth', authRoutes)
app.use('/api/courses', courses)
app.use('/api/profile', profileRoutes)

//start server
app.listen(PORT, (err)=>{
    if(err){
        console.error('Server failed to start')
    }
    else{
        console.log('Server is running')
    }
})


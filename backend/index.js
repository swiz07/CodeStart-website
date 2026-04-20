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
const userRoutes=require('./routes/userRoutes')
const courseRoutes=require('./routes/courseRoutes')
const blogRoutes=require('./routes/blogRoutes')
const authRoutes=require('./routes/authRoutes')
const profileRoutes=require('./routes/profileRoutes')
const lessonRoutes=require('./routes/lessonRoutes')

app.use('/api/', userRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/lessons', lessonRoutes);
app.use('/api/blogs', blogRoutes) 

//start server
app.listen(PORT, (err)=>{
    if(err){
        console.error('Server failed to start')
    }
    else{
        console.log('Server is running')
    }
})


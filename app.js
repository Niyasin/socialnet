const express =require('express');
const mongoose =require('mongoose');
const User =require('./models/user');

const app=express();


mongoose.connect('mongodb://localhost:27017/socialnet')
.then(()=>{
    app.listen(8080);
    console.log('Server Started');
}).catch(err=>{
    console.log(err);
})
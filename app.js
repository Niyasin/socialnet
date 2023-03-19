const express =require('express');
const mongoose =require('mongoose');
const bodyparser =require('body-parser');
const cookieparser=require('cookie-parser');
const User =require('./models/user');
const {signup,login,auth} =require('./controllers/authentication');
const app=express();

app.use(bodyparser.json());
app.use(cookieparser());
app.post('/signup',signup);
app.post('/login',login);
app.post('/test',auth,(req,res)=>{console.log('😕');});


mongoose.connect('mongodb://0.0.0.0:27017/socialnet').then(()=>{
        app.listen(8080);
        console.log('Server Started');
    }).catch(err=>{
        console.log(err);
    });
const express =require('express');
const mongoose =require('mongoose');
const bodyparser =require('body-parser');
const User =require('./models/user');
const {signup,login} =require('./controllers/authentication');
const app=express();

app.use(bodyparser.json());


app.post('/signup',signup);
app.post('/login',login);



mongoose.connect('mongodb://0.0.0.0:27017/socialnet').then(()=>{
        app.listen(8080);
        console.log('Server Started');
    }).catch(err=>{
        console.log(err);
    });
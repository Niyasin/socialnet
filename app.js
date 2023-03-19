const express =require('express');
const mongoose =require('mongoose');
const path=require('path')
const bodyparser =require('body-parser');
const cookieparser=require('cookie-parser');
const User =require('./models/user');
const {signup,login,auth} =require('./controllers/authentication');
const {search,getUserData,addFriend}=require('./controllers/user')
const app=express();


app.use(express.static(path.join(__dirname,'client','build')));
app.use(bodyparser.json());
app.use(cookieparser());
app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'client','build','index.html'))});
app.post('/signup',signup);
app.post('/login',login);
app.get('/search',search);
app.post('/test',(req,res)=>{console.log(req.query);});
app.post('/getUserData',auth,getUserData);
app.post('/addFriend',auth,addFriend);

mongoose.connect('mongodb://0.0.0.0:27017/socialnet').then(()=>{
        app.listen(8080);
        console.log('Server Started');
    }).catch(err=>{
        console.log(err);
    });
const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    displayname:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    posts:[mongoose.Schema.Types.ObjectId],
});

const User=new mongoose.model('user',userSchema);
module.exports=User;
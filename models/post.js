const mongoose =require('mongoose');

const postSchema =new mongoose.Schema({
    text:{
        type:String,
    },
    image:{
        type:String,
    },
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
});

const Post=new mongoose.model('post',postSchema);
module.exports=Post;

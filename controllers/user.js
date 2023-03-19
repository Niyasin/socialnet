const User =require('../models/user');

module.exports.search= async(req,res)=>{
    let keyword=req.query.q;
    let docs=await User.find({ "username" : { $regex: keyword, $options: 'i' }});
    res.send(JSON.stringify(docs));
}


module.exports.getUserData= async(req,res)=>{
    console.log(req.body.username);
    if(req.body.username){
        let user =await User.findOne({username:req.body.username});
        res.send(JSON.stringify({username:user.username,displayname:user.displayname,image:user.image,friends:user.friends,posts:user.posts}));
    }else{
        res.send(JSON.stringify({error:true}));
    }
}
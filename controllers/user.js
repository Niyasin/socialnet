const User =require('../models/user');

module.exports.search= async(req,res)=>{
    let keyword=req.query.q;
    let docs=await User.find({ "username" : { $regex: keyword, $options: 'i' }});
    res.send(JSON.stringify(docs));
}


module.exports.getUserData= async(req,res)=>{
    console.log(req.body.username);
    if(req.body.username){
        let user =await User.findOne({username:req.body.username}).populate({path:'friends',select:'username displayname image'});
        let data=JSON.stringify({username:user.username,displayname:user.displayname,image:user.image,friends:user.friends,posts:user.posts})
        res.send(data);
    }else{
        res.send(JSON.stringify({error:true}));
    }
}


module.exports.addFriend= async(req,res)=>{
    console.log(req.body);
    User.findOne({username:req.body.username}).then((friend)=>{
        if(friend && !req.user.friends.includes(friend._id)){
            User.updateOne(
                {username:req.user.username},
                {$push:{friends:friend._id}}
            ).then(()=>{
                User.updateOne(
                    {username:friend.username},
                    {$push:{friends:req.user._id}}
                );
                res.send(JSON.stringify({error:false}));
                });
                }else{
                    res.send(JSON.stringify({error:false}));
                }
            });
}
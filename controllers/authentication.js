const User =require('../models/user');
const {scryptSync,randomBytes} =require('crypto')

module.exports.signup=async (req,res)=>{
    let doc={
        username:req.body.username,
        displayname:req.body.username,
        email:null,
        dob:null,
        image:'./public/unknown.jpg',
        friends:[],
        posts:[],
    }
    let salt=randomBytes(16).toString('hex');
    let password = scryptSync(req.body.password,salt,32).toString('hex');
    doc.password=`${password}:${salt}`;
    try{
        let user = await User.create(doc);
        res.send(JSON.stringify({error:false,data:doc}));
    }catch(e){
        res.send(JSON.stringify({error:true}));
    }

}
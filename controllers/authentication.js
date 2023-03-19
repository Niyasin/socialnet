const User =require('../models/user');
const {scryptSync,randomBytes,timingSafeEqual} =require('crypto')
const {sign,verify} =require('jsonwebtoken');

const appSecret='secret'

const createToken=(id)=>{
   return sign({id},appSecret,{expiresIn:60});
}

module.exports.signup=async (req,res)=>{
    let doc={
        username:req.body.username,
        displayname:req.body.username,
        email:null,
        dob:null,
        image:'./images/unknown.jpg',
        friends:[],
        posts:[],
    }
    let salt=randomBytes(16).toString('hex');
    let password = scryptSync(req.body.password,salt,32).toString('hex');
    doc.password=`${password}:${salt}`;
    try{
        let user = await User.create(doc);
         doc.token=createToken(user._id);
         res.setHeader('Set-Cookie',`token=${doc.token}`);
        res.send(JSON.stringify({error:false,data:doc}));
    }catch(e){
        res.send(JSON.stringify({error:true}));
    }
}

module.exports.login=async (req,res)=>{
    try{
        let user=await User.findOne({username:req.body.username});
        if(user){
            let [pw,salt]=user.password.split(':');
            let hash=await scryptSync(req.body.password,salt,32);
            let buff=Buffer.from(pw,'hex');
            let auth = timingSafeEqual(buff,hash);
            if(auth){
                let token=createToken(user._id);
                let doc ={
                    username:user.username,
                    displayname:user.displayname,
                    email:user.email,
                    dob:user.dob,
                    image:user.image,
                    friends:user.friends,
                    token,
                }
                res.setHeader('Set-Cookie',`token=${doc.token}`);
                res.send(JSON.stringify({error:false,data:doc}));
            }else{
                res.send(JSON.stringify({error:true}));
            }
        }
    }catch(e){
        res.send(JSON.stringify({error:true}));
    }
}

module.exports.auth=async(req,res,next)=>{
    let token=req.cookies.token;
    if(token){
        try{
            await verify(token,appSecret,async (err,decoded)=>{
                if(err){
                    res.send(JSON.stringify({error:true}))
                }else{
                    req.user =await User.findOne({_id:decoded.id});
                    next();
                }
            })
        }catch(e){}
    }else{
        res.send(JSON.stringify({error:true}))
    }
}
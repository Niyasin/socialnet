const User =require('../models/user');

module.exports.search= async(req,res)=>{
    let keyword=req.query.q;
    let docs=await User.find({ "username" : { $regex: keyword, $options: 'i' }});
    res.send(JSON.stringify(docs));
}
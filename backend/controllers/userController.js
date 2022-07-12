const User=require("../model/UserModel");
const bcrypt=require("bcrypt");





module.exports.register= async(req,res,next)=>{
    try {
        
    const { name,email,password}=req.body;
    const userchk=await User.findOne({ email});
    if(userchk)
        return res.json({ msg: "User Already Exists !!",status:false});
        
    const hashedPassword=await bcrypt.hash(password, 10);
    const user=await User.create({ name,email,password:hashedPassword,});

    delete user.password;
    return res.json({ msg: "User Added Successfully !!" ,status: true,user});
  
    } 
    catch (error) 
    {
        next(error);
    }
};


module.exports.login= async(req,res,next)=>{
    try {
        
    const { email,password}=req.body;
    const userchk=await User.findOne({ email});
    if(!userchk)
        return res.json({ msg: "Email not Exists !!",status:false});

    const credentialchk=await bcrypt.compare(password, userchk.password);
       
    if(!credentialchk)
        return res.json({ msg: "InCorrect Password !!",status:false});

    delete userchk.password;
    return res.json({ msg: "Login  Successfull !!",status:true,userchk});
    } 
    catch (error) 
    {
        next(error);
    }
};


module.exports.getAllUsers= async(req,res,next)=>{

    try {
        const users=await User.find({ _id:{ $ne :req.params.id}}).select([ "email","name","avtarImage","_id"])
        return res.json(users);
    
    } 
    catch (error) {
        
    }

}
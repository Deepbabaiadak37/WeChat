const messageModel=require('../model/messageModel');


module.exports.addMessage= async(req,res,next)=>{
   
    try {
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:{from,to},
            sender:from,
        });

        if(data) return res.json({ msg:"message added Successfully"});


        return res.json({msg:"Failed to add Messages"});

        
    } catch (error) {
        next(error);
    }
};





module.exports.getAllMessage= async(req,res,next)=>{
    try {
        const {from,to}=req.body;
        console.log(from,to);
        const messages=await messageModel.find({

            $or: [ { users: { from:from, to:to} }, { users: { from:to,to:from } } ]
       
        }).sort({updatedAt: 1});

        console.log("......",messages);

        const projectMessages=messages.map((msg)=>{
            return {
                returnSelf: msg.sender.toString()===from,
                message: msg.message.text
            };
        });

        console.log(projectMessages);
        res.json(projectMessages);

    } 
    catch (error) {
        next(error);
    }
   
};





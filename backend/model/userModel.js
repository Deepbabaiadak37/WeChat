const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAvtarImageSet:
    {
        type: Boolean,
        default:false
    },
    avtarImage:
    {
        type:String,
        default:""
    }

});

module.exports=mongoose.model("Users",userSchema);
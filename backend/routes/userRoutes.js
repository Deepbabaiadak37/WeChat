const { set } = require('mongoose');
const { register, login,getAllUsers } = require('../controllers/userController');
const multer =  require('multer');
const router=require('express').Router();
const User=require("../model/UserModel");


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})




router.get("/getContacts/:id",getAllUsers);
router.post("/register",register);
router.post("/login",login);
router.post('/setAvatar',upload.single('image'), async(req, res) => {
    try 
    {
        const userchk=await User.findOne({_id:req.body.id});
        if(!userchk)
            return res.json({ msg: "User Invalid !!", status:400});
        await User.updateOne({ "_id": req.body.id },{$set : {  "avtarImage": 'http://localhost:8000/images/' +req.file.originalname ,"isAvtarImageSet" : true }})
        const data=await User.findOne({_id:req.body.id});

        await delete data.password;
        return res.json({ status:200,data});
       
    }
    catch(err)
    {
        console.error(err);
       return  res.status(200).json({msg: err ,status:500});
    }
})

module.exports=router;
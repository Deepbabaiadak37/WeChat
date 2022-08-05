
const { addMessage,getAllMessage} = require('../controllers/messageController');

const router=require('express').Router();



router.get("/addmsg",addMessage);
router.post("/getmsg",getAllMessage);


module.exports=router;
const {addMsg, getAllMsg} = require("../controller/msgController");

const router = require("express").Router();
router.post("/addmsg",addMsg)
router.post("/getmsg",getAllMsg)

module.exports = router
const msgModel = require("../model/msgModel")

module.exports.addMsg = async (req,res,next) => {
    try{
        const {from,to,message} = req.body
        const data = await msgModel.create({
            message: {text:message},
            users: [from, to],
            sender: from
        })
        if(data) return res.json({msg: "Message added successfully"})
        else return res.json({msg: "Message not sent"})
    }
    catch (ex){
        next(ex)
    }
}
module.exports.getAllMsg = async (req,res,next) => {
    try{
        const {from, to} = req.body
        const messages = await msgModel.find({
            users:{
                $all: [from,to]
            }
        })
        .sort({updatedAt: 1})
        const projectMsgs = messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        return res.json(projectMsgs)
    }
    catch(ex){
        next(ex)
    }
}

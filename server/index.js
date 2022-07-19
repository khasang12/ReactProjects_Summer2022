const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const msgRoutes = require("./routes/msgRoutes")
const socket = require("socket.io")

const app = express()
require("dotenv").config()

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/messages",msgRoutes)

app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "../public/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connection successful")
    }).catch((err)=>{
        console.log(err.message)
    })

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
})

global.onlineUsers = new Map()
io.on("connection",(socket) => {
    global.chatSocket = socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive", data.msg)
        }
    })
})
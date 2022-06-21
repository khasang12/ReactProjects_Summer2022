import axios from "axios"
import React, {useState, useEffect, useRef} from "react"
import { getAllMsgRoute, sendMsgRoute } from "../utils/APIRoutes"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import Logout from "./LogOut"

export default function ChatContainer({user, admin, socket}){
    const {username, avatarImage} = user
    const [messages, setMessages] = useState([])
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const scrollRef = useRef()
    useEffect(()=>{
        async function getAllChatHistory(){
            const response = await axios.post(getAllMsgRoute,{
                from: admin._id,
                to: user._id
            })
            setMessages(response.data)
        }
        getAllChatHistory()
    },[username])
    const handleSendMsg = async (msg) =>{
        await axios.post(sendMsgRoute,{
            from: admin._id,
            to: user._id,
            message: msg
        })
        socket.current.emit("send-msg",{
            from: admin._id,
            to: user._id,
            message: msg
        })
        setMessages(oldMsgs => [...oldMsgs,{fromSelf:true, message:msg}])
    }
    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-receive",(msg)=>{
                setArrivalMsg({fromSelf: false, message: msg})
            })
        }
    },[])
    useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg])
    },[arrivalMsg])
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:smooth})
    },[messages])
    return(
        <div className="user-chat">
            <div className="nav-chat">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${avatarImage}`} alt="avatar"/>
                </div>
                <h3>{username}</h3>
                <Logout/>
            </div>
            {messages && <Messages messages={messages} userImage={avatarImage}/>}
            <ChatInput 
                className="chat-box" 
                sendMsg={handleSendMsg}/>

        </div>
    )
}
import React, {useState, useEffect, useRef} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { allUsersRoute, host } from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"
import LogOut from "../components/LogOut"
import {io} from "socket.io-client"

export default function Chat(){
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    useEffect(()=>{
        async function getUser(){
            return setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        }
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
        else{ 
            getUser()
        }
    },[])
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host)
            socket.current.emit("add-user",currentUser._id)
        }
    },[currentUser])
    useEffect(()=>{
        async function checkSetAvatar(){
            if(currentUser){
                if(currentUser.isAvatarSet){
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                    setContacts(data.data)
                }
                else{
                    navigate("/setAvatar")
                }
            }
        }
        checkSetAvatar()
    },[currentUser])
    function handleChatChange(chat){
        setCurrentChat(chat)
    }
    return(
        <div className="chat">
            <div className="chat-container">
                <Contacts 
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                    />
                {!currentChat && currentUser && <Welcome user={currentUser}/>}
                {currentChat && <ChatContainer user={currentChat} admin={currentUser} socket={socket}/>}
            </div>
        </div>
    )
}


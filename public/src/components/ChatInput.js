import React, {useState} from "react"
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

export default function ChatInput({sendMsg}){
    const [showEmoji, setShowEmoji] = useState(false)
    const [msg, setMsg] = useState("")
    function toggleEmoji(){
        setShowEmoji(!showEmoji)
    }
    function handleEmojiClick(event, emoji){
        setMsg(oldMsg => oldMsg + emoji.emoji)
    }
    function sendChat(event){
        event.preventDefault();
        if(msg.length>0){
            sendMsg(msg)
            setMsg("")
        }
    }
    return (
        <div className="chat-input">
            <div className="chat-btn-container">
                <BsEmojiSmileFill className="emoji" onClick={toggleEmoji}/>
                {showEmoji && <Picker className="emoji-picker" onEmojiClick={handleEmojiClick}/>}
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="type msg here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className="input-submit">
                    <IoMdSend/>
                </button>
            </form>
        </div>
    )
}
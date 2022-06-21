import React, {useRef} from "react"
import {v4 as uuidv4} from "uuid"

export default function Messages({messages,userImage}){
    const scrollRef = useRef()
    const msgs = messages.map((msg)=>{
        return(
            <div ref={scrollRef} key={uuidv4} className={`message ${msg.fromSelf?"sended":"received"}`}>
                <div className="content">
                    {!msg.fromSelf && <img className= "msg-img" src={`data:image/svg+xml;base64,${userImage}`} alt="avatar"/>}
                    <p>{msg.message}</p>
                </div>
            </div>
        )
    })
    return(
        <div className="msg-container">
            {msgs}
        </div>
    )
}
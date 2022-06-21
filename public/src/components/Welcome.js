import React from "react"
import Robot from "../assets/robot.gif"
export default function Welcome({user}){
    const {username} = user
    return(
        <div className="welcome-chat">
            <img className="welcome-img" src={Robot} alt="robot" />
            <h2>Welcome, {username}!</h2>
            <h3>Select a chat to start Messaging</h3>
        </div>
    )
}
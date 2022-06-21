import React, {useEffect, useState} from "react"
import Logo from "../assets/logo.png"

export default function Contacts({contacts,currentUser, changeChat}){
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)
    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username)
            setCurrentUserImage(currentUser.avatarImage)
        }
    }, [currentUser])
    function changeCurrentChat(index, contact){
        setCurrentSelected(index)
        changeChat(contact)
    }
    return (
        <div className="contact-container">
            <div className="contact-list">
                <div className="contact-title">
                    <img src={Logo} alt="logo" />
                    <h3>snappy</h3>
                </div>
                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
                    </div>
                    <div className="username">
                        <h3>{currentUserName}</h3>
                    </div>
                </div>  
                <hr />
                <div className="contacts">
                    {contacts.map((contact,index) => {
                        return (
                            <div className={`contact ${index===currentSelected?"selected":""}`}
                                key={index}
                                onClick={() => changeCurrentChat(index,contact)}>
                                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                                </div>
                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
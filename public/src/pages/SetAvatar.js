import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import loader from "../assets/loader.gif"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes"

export default function SetAvatar(){
    const api = `https://api.multiavatar.com/4645646`;    
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [indexAvatar, setIndexAvatar] = useState(undefined)
    const setProfilePicture = async () => {
        if(indexAvatar===undefined){
            toast.error("Please choose an avatar",toastOptions)
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[indexAvatar]
            })
            console.log(data)
            //localStorage
            if(data.isSet){
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem("chat-app-user", JSON.stringify(user))
                navigate("/")
            }
            else{
                toast.error("Error while saving avatar. Please try again",toastOptions)
            }
        }
    };
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = []
            for(let i=0; i<4;i++){
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString("base64"))
            }
            setAvatars(data)
            setIsLoading(false)
        }
        fetchData()
            .catch(console.error);        
    },[])

    return (
        <div className="ava-container">
            {isLoading && <img src={loader} alt="loader" className="loader"/>}
            <div className="ava-title">
                {isLoading ? <h1>Loading...</h1>
                        : <h1>Pick an avatar as your profile picture</h1>}
            </div>
            <div className="avatars">{
                avatars.map((avatar,index)=>{
                    return (
                        <div 
                            key={index} 
                            className={`avatar ${indexAvatar===index?"selected":""}`}
                            onClick={()=>setIndexAvatar(index)}>
                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"/>
                        </div>
                    )
                })
            } 
            </div>
            {!isLoading && <button className="ava-btn" onClick={setProfilePicture}>Set as Profile Picture</button>}
            <ToastContainer/>
        </div>
    )
}
const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}
import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import Logo from "../assets/logo.png"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { loginRoute } from "../utils/APIRoutes"

export default function Login(){
    const navigate = useNavigate() 
    const [values, setValues] = useState({
        username: "",
        password: ""
    })
    
    //login once
    /*useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    },[])*/
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()){
            console.log("in validation", loginRoute)
            const {password, username} = values
            const {data} = await axios.post(loginRoute,{
                username,
                password
            })
            if(data.status===false){
                toast.error(data.msg, toastOptions)
            }
            else{
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                console.log(data.user)
                if(data.user.isAvatarSet)
                    navigate("/")
                else{
                    navigate("/setAvatar")
                }
            }
        }   
        
    };
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]:event.target.value
        })
    };
    const handleValidation = () =>{
        const {password, username} = values
        const toastOptions = {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
        }
        if(password === ""){
            toast.error("Password required", toastOptions)
            return false;
        }
        else if(username === ""){
            toast.info("Username required", toastOptions)
            return false;
        }
        else{
            return true;
        }
    }
    return(
        <div className="reg-container">
            <form className="reg-form" onSubmit={(event) => handleSubmit(event)}>
                <div className="reg-brand">
                    <img src={Logo} alt="Logo" />
                    <h1>snappy</h1>
                </div>
                <input type="text" 
                    placeholder="Username" 
                    name="username"
                    onChange={(e)=>handleChange(e)}
                    />
                <input type="password" 
                    placeholder="Password" 
                    name="password"
                    onChange={(e)=>handleChange(e)}
                    />
                <button 
                    className="reg-button" 
                    type="submit">Login</button>
                <span className="reg-change">
                    Don't have an account ? <Link to="/register">Register</Link>
                </span>
            </form>
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
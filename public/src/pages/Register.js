import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import Logo from "../assets/logo.png"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { registerRoute } from "../utils/APIRoutes"

export default function Register(){
    const navigate = useNavigate() 
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()){
            console.log("in validation", registerRoute)
            const {password, username, email} = values
            const {data} = await axios.post(registerRoute,{
                username,
                email,
                password
            })
            if(data.status===false){
                toast.error(data.msg, toastOptions)
            }
            else{
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                navigate("/")
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
        const {password, confirmPassword, username, email} = values
        
        if(password !== confirmPassword){
            toast.error("Password mismatch", toastOptions)
            return false;
        }
        else if(username.length < 3){
            toast.info("Username should be equal or greater than 3", toastOptions)
            return false;
        }
        else if(password.length < 8){
            toast.info("Password should be equal or greater than 8", toastOptions)
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
                <input type="email" 
                    placeholder="Email" 
                    name="email"
                    onChange={(e)=>handleChange(e)}
                    />
                <input type="password" 
                    placeholder="Password" 
                    name="password"
                    onChange={(e)=>handleChange(e)}
                    />
                <input type="password" 
                    placeholder="Confirm Password" 
                    name="confirmPassword"
                    onChange={(e)=>handleChange(e)}
                    />
                <button 
                    className="reg-button" 
                    type="submit">Create User</button>
                <span className="reg-change">
                    Already have an account ? <Link to="/login">Login</Link>
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
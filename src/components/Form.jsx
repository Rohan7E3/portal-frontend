import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import logo from '../assets/logo.jpg';
import '../styles/Form.css';


function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {   
            const res = await api.post(route, {username, password});
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert("Invalid Credentials")
        } finally {
            setLoading(false)
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="form-container">
            <img src={logo} className="header-image" alt="logo"/>
            <h3 id="header">Login</h3>
            <div className="form-floating">
                <input type="text" className="form-control" id="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Student"/>
                <label htmlFor="usernameInput">Student ID</label>
            </div> 
            <div className="form-floating">
                <input type="password" className="form-control" id="passInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <label htmlFor="passInput">Password</label>
            </div>
            <div id="loader">
                {loading && <LoadingIndicator/>}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}

export default Form
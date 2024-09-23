import React, { useState } from "react";
import api from "../api";
import '../styles/Form.css';
import LoadingIndicator from "./LoadingIndicator";

function RegisterForm({route, method}) {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try{
            await api.post(route, {first_name, last_name, username, password});
            if (method === "login"){
                alert("Student created successfully");
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <form onSubmit={handleSubmit} className="form-container">
            <h3 id="header">Register Student</h3>
            <div className="form-floating">
                <input type="text" className="form-control" id="firstnameInput" value={first_name} onChange={(e) => setFirst_name(e.target.value)} placeholder="Fname"/>
                <label htmlFor="firstnameInput">First Name</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="lastnameInput" value={last_name} onChange={(e) => setLast_name(e.target.value)} placeholder="Lname"/>
                <label htmlFor="lastnameInput">Last Name</label>
            </div>
            <div className="form-floating"> 
                <input type="text" className="form-control" id="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                <label htmlFor="usernameInput">Student ID</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <label htmlFor="passwordInput">Password</label>
            </div>
            <div id="loader">
                {loading && <LoadingIndicator/>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default RegisterForm
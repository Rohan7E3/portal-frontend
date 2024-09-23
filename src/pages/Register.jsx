import React from "react";
import '../styles/Login.css';
import RegisterForm from "../components/RegisterForm";

function Register() {
    return(
        <div id="container">
            <RegisterForm route="/api/user/register/" method="login"/>
        </div>
    )
}

export default Register
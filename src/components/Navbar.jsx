import React from "react";
import { NavbarData, AdminNavbarData } from "./NavbarData";
import pfp from '../assets/default.png';

function Navbar({userInfo}) {

    return(
        <div id="head">
            <img src={pfp} alt="default" className="pfp"/>
            <h3>{userInfo.is_staff === true ? "Staff" : "Student"}</h3>
            <ul className="navlist">
                {userInfo.is_staff === false ? NavbarData.map((val, key) => {
                    return (
                        <li key={key} className={window.location.pathname == val.link ? "navrow-active" : "navrow"} onClick={() => {window.location.pathname = val.link}}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    )
                }) : AdminNavbarData.map((val, key) => {
                    return (
                        <li key={key} className={window.location.pathname == val.link ? "navrow-active" : "navrow"} onClick={() => {window.location.pathname = val.link}}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navbar
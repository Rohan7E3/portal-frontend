import React from "react";
import '../styles/HomeHeader.css';
import { HeaderTitles, AdminHeaderTitles } from "./HeaderTitles";

function HomeHeader({userInfo}) {
    
    const currentTitle = HeaderTitles.find(item => item.path === window.location.pathname)?.title;
    const currentAdminTitle = AdminHeaderTitles.find(item => item.path === window.location.pathname)?.title;

    return(
        <div>
            <div id="top">
                <h1>{userInfo.is_staff === false ? currentTitle : currentAdminTitle}</h1>
                <div className="top-button">
                    <button type="button" onClick={() => {window.location.pathname = "/logout"}} className="btn btn-danger">Logout</button>
                </div>
            </div>
            <hr className="solid"/>
        </div>
    )
}

export default HomeHeader
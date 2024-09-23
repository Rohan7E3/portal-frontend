import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";
import api from '../api';

function Calendar() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => { 
        getUserInfo();
    }, [])

    const getUserInfo = () => {
        api.get("/api/user-status/").then((res) => res.data).then((data) => {
            setUserInfo(data);
            console.log("main", data);
        }).catch((error) => alert(error));
    }
    
    return(
        <div>
            <Navbar userInfo={userInfo}/>
            <HomeHeader userInfo={userInfo}/>
        </div>
    )
}

export default Calendar
import React, { useState, useEffect } from "react";
import api from '../api';
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";
import GradeTable from "../components/GradeTable";
import PostGrades from "../components/PostGrades";

function Grades() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(()=> {
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
            <div>
                <Navbar userInfo={userInfo}/>
                <HomeHeader userInfo={userInfo}/>
            </div>
            <div className="content">
                {userInfo.is_staff === false ? <GradeTable/> : <PostGrades/>}
            </div>
        </div>
    )
}
export default Grades
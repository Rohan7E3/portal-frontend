import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeHeader from "../components/HomeHeader";
import '../styles/Attendance.css';
import AttendanceTable from "../components/AttendanceTable";
import api from '../api';
import PostAttendance from "../components/PostAttendance";

function Attendance() {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = () => {
        api.get("/api/user-status/").then((res) => res.data).then((data) => {
            setUserInfo(data);
        })
    }

    return(
        <div>
            <div>
                <Navbar userInfo={userInfo}/>
                <HomeHeader userInfo={userInfo}/>
            </div>
            <div className="content">
                {userInfo.is_staff === false ? <AttendanceTable/> : <PostAttendance/>}
            </div>
        </div>
    )
}

export default Attendance
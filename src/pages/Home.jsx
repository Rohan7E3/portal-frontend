import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HomeHeader from '../components/HomeHeader';
import api from '../api';
import '../styles/Home.css';
import '../styles/Navbar.css';
import '../styles/HomeHeader.css';
import StudentList from '../components/StudentList';

function Home() {
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
            <div>
                <Navbar userInfo={userInfo}/>
                <HomeHeader userInfo={userInfo}/>
            </div>
            <div className="content">
                {userInfo.is_staff === true ? <StudentList/> : <h1>Test</h1>}
            </div>
        </div>
    )
}

export default Home
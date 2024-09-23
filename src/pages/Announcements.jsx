import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import HomeHeader from '../components/HomeHeader';
import AnnouncementBox from "../components/AnnouncementBox";
import '../styles/Announcements.css';
import api from '../api';

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [userInfo, setUserInfo] = useState([]);

    const getUserInfo = () => {
        api.get("/api/user-status/").then((res) => res.data).then((data) => {
            setUserInfo(data);
            console.log(data);
        }).catch((error) => alert(error));
    };

    useEffect(() => {
        getAnnouncements();
        getUserInfo();
    }, [])
    
    const getAnnouncements = () => {
        api.get("/api/announcements/").then((res) => res.data).then((data) =>{setAnnouncements(data); console.log(data)}).catch((error) => alert(error));
    };

    const deleteAnnouncement = (id) => {
        api.delete(`/api/announcements/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                alert("Success");
            } else {
                alert("Failure");
            }
            getAnnouncements();
        }).catch((error) => alert(error));
    };

    const createAnnouncement = (e) => {
        e.preventDefault();
        api.post("/api/announcements/", {content, title}).then((res) => {
            if (res.status === 201) {
                alert("Announcement posted");
            } else {
                alert("Error posting");
            }
            getAnnouncements();
        }).catch((error) => alert(error));
    }

    return(
        <div>
            <div>
                <Navbar userInfo={userInfo}/>
                <HomeHeader userInfo={userInfo}/>
            </div>
            <div className="row content">
                <div className="col-7">
                    {announcements.slice().reverse().map((announcement, index) => (
                    <div key={announcement.id}>
                        <AnnouncementBox
                        announcement={announcement}
                        onDelete={deleteAnnouncement}
                        userInfo={userInfo}
                        />
                        {index !== announcements.length - 1 && <div style={{ marginBottom: '20px' }}></div>}
                    </div>
                    ))}
                    <br />
                </div>
                {userInfo.is_staff === true ? <div id="form" className="col">
                    <h4>Create post</h4>
                    <form onSubmit={createAnnouncement}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" name="title" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)} value={title}/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea className="form-control" id="content" name="content" placeholder="Enter Content" required value={content} onChange={(e) => setContent(e.target.value)}/>
                        </div>
                        <button id="submit-button" type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div> : <></>}
            </div>
        </div>
    )
}

export default Announcements
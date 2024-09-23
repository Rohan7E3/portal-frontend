import React, { useEffect, useState } from "react";
import '../styles/AnnouncementBox.css';

function AnnouncementBox({announcement, onDelete, userInfo}) {
    const formattedDate = new Date(announcement.created_at).toLocaleDateString("en-UK")

    return(
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    Posted by {announcement.author_first_name} {announcement.author_last_name}
                    <span>{formattedDate}</span>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{announcement.title}</h4>
                    <p className="card-text">{announcement.content}</p>
                    <div className="deleteButton">
                        {userInfo.is_staff === true ? <button type="button" className="btn btn-danger" onClick={() => onDelete(announcement.id)}>Delete</button> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnnouncementBox
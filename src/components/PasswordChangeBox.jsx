import React, { useEffect, useState } from "react";
import api from '../api';
import lock from '../assets/lock.svg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingIndicator from "./LoadingIndicator";

function PasswordChangeBox() {
    
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const getCurrentUser = async () => {
        await api.get("/api/current-user/").then((res) => res.data).then((data) => {
            setCurrentUser(data);
            console.log(data.id);
        }).catch((error) => alert(error));
    }

    useEffect(() => {
        getCurrentUser();
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (newPassword === confPassword) {
            try {
                await api.put(`/api/change-password/${currentUser.id}/`, {old_password: password, new_password: newPassword})
                setLoading(false);
                alert("Password changed successfully");
                handleClose();
            } catch (error) {
                alert(error);
                setPassword("");
                setNewPassword("");
                setConfPassword("");
            } finally {
                setLoading(false);
                setPassword("");
                setNewPassword("");
                setConfPassword("");
            }
        } else {
            setLoading(false);
            alert("Passwords do not match!")
        } 
    } 

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    return(
        <div>
            <div className="card" onClick={handleOpen}>
                <img src={lock} alt="lock icon" className="card-img" />
                <div className="card-body">
                    <h5 className="card-text">Change Password</h5>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="passInput" placeholder="Old Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label htmlFor="passInput">Old Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="newPassInput" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                <label htmlFor="newPassInput">New Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="confPassInput" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                                <label htmlFor="confPassInput">Confirm New Password</label>
                            </div>
                            <div id="loader">
                                {loading && <LoadingIndicator/>}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default PasswordChangeBox
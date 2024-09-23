import React, { useState } from "react";
import addUserIcon from '../assets/addUser.svg';
import api from '../api';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RegisterForm from "./RegisterForm";

function AddStudent({userInfo}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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
                <img src={addUserIcon} alt="lock icon" className="card-img" />
                <div className="card-body">
                    <h5 className="card-text">Add Student</h5>
                </div>                
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography>
                        <RegisterForm route="/api/user/register/" method="login"/>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default AddStudent
import React, { useState } from "react";
import '../styles/StudentBox.css';

function StudentBox({student}) {
    const [pres, setPres] = useState(false);

    const handleClick = () => {
        pres === true ? setPres(false) : setPres(true);
    }

    return(
        <div>
            <div onClick={handleClick} className={ pres === false ? "stud-box" : "stud-box-clicked"}>
                <div className="stud-name">
                    <h4>{student.first_name} {student.last_name}</h4>
                </div>
            </div>
        </div>
    )
}

export default StudentBox
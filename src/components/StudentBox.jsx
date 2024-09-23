import React, { useState } from "react";
import '../styles/StudentBox.css';

function StudentBox({student}) {
    const [pres, setPres] = useState(false);
    const [ab, setAb] = useState(false);


    const handlePClick = () => {
        pres === false ? setPres(true) : setPres(false);
        if (ab === true) {
            setAb(false);
        }
    }

    const handleAClick = () => {
        ab === false ? setAb(true) : setAb(false);
        if (pres === true) {
            setPres(false);
        }
    }

    return(
        <div>
            <div className="stud-box">
                <div className="stud-name">
                    <div>
                        <h4>{student.first_name} {student.last_name}</h4>
                    </div>
                    <div onClick={handlePClick} className={pres === false ? "checkbox-present" : "checkbox-present-clicked"}>
                        <h4>P</h4>
                    </div>
                    <div onClick={handleAClick} className={ab === false ? "checkbox-absent" : "checkbox-absent-clicked"}>
                        <h4>A</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentBox
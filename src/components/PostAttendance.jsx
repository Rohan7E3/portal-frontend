import React, { useEffect, useState } from "react";
import api from '../api';
import StudentBox from "../components/StudentBox";
import '../styles/Attendance.css';
import '../styles/PostAttendance.css';

function PostAttendance() {
    const [subject, setSubject] = useState("");
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState("");

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    useEffect(() => {
        getStudents();
    }, [])

    const getStudents = () => {
        api.get("/api/student/").then((res) => res.data).then((data) => {
            // Add new field
            setStudents(data); 
            console.log(data);
        }).catch((error) => alert(error));
    }

    return(
        <div>
            <form>
                <div id="floating-card">
                    <h2>Mark Attendance</h2>
                    <br/>
                    <div className="date-class-select">
                        <div className="form-floating">
                            <input onChange={handleDateChange} type="date" className="form-control" id="datee" placeholder="Enter date"/>
                            <label htmlFor="datee">Enter date</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subjectt">Enter Subject</label>
                            <select className="form-control" id="subjectt" value={subject} onChange={handleSubjectChange}>
                                <option value="">Select Subject</option>
                                <option value="Computer Vision">Computer Vision</option>
                                <option value="Information Security and Protection">Information Security and Protection</option>
                                <option value="Principles of Artificial Intelligence">Principles of Artificial Intelligence</option>
                                <option value="Graph Theory">Graph Theory</option>
                                <option value="Computer Graphics">Computer Graphics</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <h3>{date} {date && subject ? "|" : ""} {subject}</h3>
                    <div id="student-grid">
                        {students.map((student) => (
                        <div key={student.id}>
                            <StudentBox
                            student={student}
                            //setStudent={setStudents}
                            />
                        </div>
                        ))}
                        <br />
                        {date && subject ? <button type="submit" id="attendance-btn" className="btn btn-primary">Submit</button> : <></>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostAttendance
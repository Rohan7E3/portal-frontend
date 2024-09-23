import React, { useEffect, useState } from "react";
import api from '../api';
import '../styles/AttendanceTable.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

function AttendanceTable() {
    
    const [attendance, setAttendance] = useState([]);
    const [subject, setSubject] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [total, setTotal] = useState(0);
    const [present, setPresent] = useState(0);
    const [absent, setAbsent] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        getAttendance();
        getSubject();
    }, [])

    const getAttendance = () => {
        api.get("/api/attendance/").then((res) => res.data).then((data) => {
            setAttendance(data);
            setFilteredAttendance(data);
            calculateSummary(data);
            console.log(data);
        }).catch((error) => alert(error));
    };

    const getSubject = () => {
        api.get("/api/subjects/").then((res) => res.data).then((data) => {
            setSubject(data);
            console.log(data);
        }).catch((error) => alert(error));
    };

    const handleSubjectChange = (e) => {
        const sub = e.target.value
        setSelectedSubject(sub);
        if (sub === "") {
            setFilteredAttendance(attendance);
            calculateSummary(attendance);
        } else {
            const filteredData = attendance.filter(att => att.subject_name === sub);
            setFilteredAttendance(filteredData);
            calculateSummary(filteredData);
        }
    }

    const calculateSummary = (data) => {
        const tot = data.length;
        const pres = data.filter(att => att.status === true).length;
        const abs = tot - pres;
        const percentage = ((pres / tot) * 100).toFixed(2);
        setTotal(tot);
        setPresent(pres);
        setAbsent(abs);
        setPercent(percentage);
    }

    const data = [
        { value: present, label: 'Present' },
        { value: absent, label: 'Absent' },
      ];
      
    const size = {
        width: 400,
        height: 200,
    };
      
    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));
      
    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
          </StyledText>
        );
    }

    return(
        <div>
            <div>
                <PieChart colors={['green', 'red']} series={[{ data, innerRadius: 80 }]} {...size}>
                    <PieCenterLabel>{percent}%</PieCenterLabel>
                </PieChart>
            </div>
            <br/>
            <div className="attendance-table">
                <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Class Number</th>
                                <th scope="col">Date</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.map((attendance, index) => (
                                <tr key={index}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{attendance.date}</td>
                                    <td>{attendance.subject_name}</td>
                                    <td>{attendance.status ? "Present" : "Absent"}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>Total</td>
                                <td>{present} / {total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Filter by Subject</h3>
                    <select value={selectedSubject} onChange={handleSubjectChange}>
                        <option value="">All Subjects</option>
                        {subject.map((subject) => (
                            <option key={subject.code} value={subject.name}>{subject.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default AttendanceTable
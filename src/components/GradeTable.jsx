import React, { useEffect, useState } from "react";
import api from "../api";
import '../styles/GradeTable.css';
import { BarChart } from '@mui/x-charts/BarChart';

function GradeTable() {

    const [grades, setGrades] = useState([]);
    const [filteredGrades, setFilteredGrades] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        getGrades();
    }, [])

    const getGrades = () => {
        api.get("/api/results/").then((res) => res.data).then((data) => {
            setGrades(data);
            setFilteredGrades(data);
            console.log(data);
        }).catch((error) => alert(error));
    };

    const handleStatusChange = (e) => {
        const stat = e.target.value;
        setSelectedStatus(stat);
        if(stat === ""){
            setFilteredGrades(grades);
        } else if(stat === "Pass"){
            const filteredData = grades.filter(grad => grad.status === true);
            setFilteredGrades(filteredData);
        } else {
            const filteredData = grades.filter(grad => grad.status === false);
            setFilteredGrades(filteredData);
        }
    }

    const yData = filteredGrades.map(grade => (
        (grade.score / grade.max_score)*100
    ));

    const xLabels = filteredGrades.map(grade => (
        grade.sub
    ));

    return(
        <div>
            <div>
                <BarChart
                    width={400}
                    height={350}
                    series={[
                        { data: yData }
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    grid={{ horizontal: true }}
                />
            </div>
            <div className="grade-table">
                <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sl Number</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Code</th>
                                <th scope="col">Result</th>
                                <th scope="col">Grade</th>
                                <th scope="col">Status</th>
                                <th scope="col">Date Uploaded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGrades.map((grade, index) => (
                                <tr key={grade.subject_code}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{grade.subject_name}</td>
                                    <td>{grade.sub}</td>
                                    <td>{grade.score}</td>
                                    <td>{(grade.score / grade.max_score)*100}%</td>  
                                    <td>{grade.status ? "Pass" : "Fail"}</td>
                                    <td>{grade.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Filter for pass and fail</h3>
                    <select value={selectedStatus} onChange={handleStatusChange}>
                        <option value="">All</option>
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default GradeTable
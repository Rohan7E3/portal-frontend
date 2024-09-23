import React, { useEffect, useState } from "react";
import api from '../api';

function StudentList() {
    
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = () => {
        api.get("/api/student/").then((res) => res.data).then((data) => {
            setStudents(data);
        })
    }

    const deleteStudent = async (id) => {
        await api.delete(`/api/user/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                alert("User deleted");
            }
            getStudents();
        }).catch((error) => alert(error));
    }
    
    return(
        <div>
            <h2>Student List:</h2>
            <div className="grade-table">
                <div>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sl No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{student.first_name} {student.last_name}</td>
                                    <td>{student.username}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Add new students from the resources tab.</p>
                </div>
            </div>
        </div>
    )
}

export default StudentList
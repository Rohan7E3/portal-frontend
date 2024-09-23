import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Annoumcements from './pages/Announcements';
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Calendar from "./pages/Calendar";
import Resources from "./pages/Resources";
import Register from "./pages/Register";

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/announcements" element={<ProtectedRoute><Annoumcements/></ProtectedRoute>}/>
          <Route path="/attendance" element={<ProtectedRoute><Attendance/></ProtectedRoute>}/>
          <Route path="/grades" element={<ProtectedRoute><Grades/></ProtectedRoute>}/>
          <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
          <Route path="/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Attendance from './components/Attendance';
import Schedule from './components/Schedule';
import Grades from './components/Grades';
import AddTask from './components/AddTask';
import AboutUs from './components/AboutUs';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tasksData, setTasksData] = useState([
        { courseName: "CS 101 - Introduction to Programming", tasks: [] },
        { courseName: "CS 201 - Data Structures", tasks: [] },
        { courseName: "CS 301 - Operating Systems", tasks: [] },
        { courseName: "CS 101 - Web Development", tasks: [] },
        { courseName: "CS 202 - DBMS", tasks: [] },
        { courseName: "CS 401 - Advanced Algorithms", tasks: [] },
    ]);

    const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
    const handleSidebarClose = () => setIsSidebarOpen(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    // Function to add a new task to a specific course
    const addTask = (courseName, task) => {
        setTasksData(prevData =>
            prevData.map(course =>
                course.courseName === courseName
                    ? { ...course, tasks: [...course.tasks, task] }
                    : course
            )
        );
    };

    return (
        <Router>
            {isLoggedIn && <Navbar onSidebarToggle={handleSidebarToggle} onLogout={handleLogout} />}
            {isLoggedIn && <Sidebar isOpen={isSidebarOpen} onSidebarClose={handleSidebarClose} />}
            
            <main>
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
                    <Route path="/" element={isLoggedIn ? <Homepage /> : <Navigate to="/login" replace />} />
                    <Route path="/tasks" element={isLoggedIn ? <Tasks tasksData={tasksData} /> : <Navigate to="/login" replace />} />
                    <Route path="/attendance" element={isLoggedIn ? <Attendance /> : <Navigate to="/login" replace />} />
                    <Route path="/schedule" element={isLoggedIn ? <Schedule /> : <Navigate to="/login" replace />} />
                    <Route path="/grades" element={isLoggedIn ? <Grades /> : <Navigate to="/login" replace />} />
                    <Route path="/add-task" element={isLoggedIn ? <AddTask tasksData={tasksData} addTask={addTask} /> : <Navigate to="/login" replace />} />
                    <Route path="/about-us" element={isLoggedIn ? <AboutUs /> : <Navigate to="/login" replace />} />

                </Routes>
            </main>
        </Router>
    );
}

export default App;

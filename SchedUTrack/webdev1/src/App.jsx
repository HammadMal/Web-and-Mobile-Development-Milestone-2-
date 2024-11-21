import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Attendance from "./components/Attendance";
import Schedule from "./components/Schedule";
import Grades from "./components/Grades";
import AddTask from "./components/AddTask";
import AboutUs from "./components/AboutUs";
import Settings from "./components/settings";
import DesignMode from './components/DesignMode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onSidebarToggle={handleSidebarToggle} onLogout={handleLogout} />}
      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} onSidebarClose={handleSidebarClose} />}
      <main>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
          />
          
          <Route path="/" element={isLoggedIn ? <Homepage /> : <Navigate to="/login" replace />} />
          <Route path="/tasks" element={isLoggedIn ? <Tasks /> : <Navigate to="/login" replace />} />
          <Route path="/attendance" element={isLoggedIn ? <Attendance /> : <Navigate to="/login" replace />} />
          <Route path="/schedule" element={isLoggedIn ? <Schedule /> : <Navigate to="/login" replace />} />
          <Route path="/grades" element={isLoggedIn ? <Grades /> : <Navigate to="/login" replace />} />
          <Route path="/add-task" element={isLoggedIn ? <AddTask /> : <Navigate to="/login" replace />} />
          <Route path="/about-us" element={isLoggedIn ? <AboutUs /> : <Navigate to="/login" replace />} />
          <Route path="/design-mode" element={isLoggedIn ? <DesignMode /> : <Navigate to="/login" replace />} />

          
          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <>
                  {console.log("Rendering Settings Component")}
                  <Settings isOpen={true} />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

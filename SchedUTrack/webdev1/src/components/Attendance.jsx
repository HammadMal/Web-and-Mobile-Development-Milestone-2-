import React, { useState, useEffect } from "react";
import "../styles/attendance.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [thresholdVisible, setThresholdVisible] = useState(false);
  const [recentAbsences, setRecentAbsences] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("Fetched attendance data:", data);
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const formatDate = (dateString) => {
    try {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("en-GB", options);
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid date";
    }
  };

  const getAttendanceColor = (totalClasses, absences) => {
    const attendancePercentage = Math.round(((totalClasses - absences) / totalClasses) * 100);
    if (attendancePercentage >= 95) return "green";
    if (attendancePercentage >= 85) return "yellow";
    if (attendancePercentage >= 75) return "red";
    return "gray";
  };

  const toggleCourseDetails = (course) => {
    setSelectedCourse(selectedCourse === course ? null : course);
  };

  const handleToggleModal = () => {
    setRecentAbsences(generateRecentAbsences());
    setModalVisible(!modalVisible);
  };

  const handleThresholdToggle = () => {
    setThresholdVisible(!thresholdVisible);
  };

  const generateRecentAbsences = () => {
    return attendanceData
      .map((course) => ({
        courseName: course.coursename,
        absenceDates: course.dates.filter(isWithinLast7Days).map((date) => formatDate(date)),
      }))
      .filter((course) => course.absenceDates.length > 0);
  };

  const isWithinLast7Days = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7 && diffInDays >= 0;
  };

  return (
    <div className="attendance-content">
      <section className="rectangle-container">
        {attendanceData.map((course) => {
          const isExpanded = selectedCourse === course;
          const colorClass = getAttendanceColor(30, course.absences);

          return (
            <div
              key={course.coursename}
              className={`rectangle ${colorClass}`}
              onClick={() => toggleCourseDetails(course)}
            >
              <h3>{course.coursename}</h3>
              {isExpanded && (
                <div className="course-info">
                  <p>
                    <strong>Total Classes:</strong> 30
                  </p>
                  <p>
                    <strong>Absences:</strong> {course.absences}
                  </p>
                  <p>
                    <strong>Absence Dates:</strong> {course.dates.map(formatDate).join(", ")}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Threshold Button */}
      <button className="threshold-btn" onClick={handleThresholdToggle}>
        Threshold
      </button>

      {thresholdVisible && (
  <div className="info-box">
    <span className="close" onClick={() => setThresholdVisible(false)}>
      &times;
    </span>
    <div className="info-item">
      <div className="color-dot green-dot"></div> 95% or above attendance
    </div>
    <div className="info-item">
      <div className="color-dot yellow-dot"></div> 85% - 94% attendance
    </div>
    <div className="info-item">
      <div className="color-dot red-dot"></div> 75% - 84% attendance
    </div>
    <div className="info-item">
      <div className="color-dot gray-dot"></div> Below 75% (Risk of withdrawal)
    </div>
  </div>
)}


      {/* Recent Absences Button */}
      <button className="recent-absences-btn" onClick={handleToggleModal}>
        Recent Absences
      </button>

      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h3>Recent Absences</h3>
            <table className="absences-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Absence Date(s)</th>
                </tr>
              </thead>
              <tbody>
                {recentAbsences.length > 0 ? (
                  recentAbsences.map((course) => (
                    <tr key={course.courseName}>
                      <td>{course.courseName}</td>
                      <td>{course.absenceDates.join(", ")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No recent absences found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              className="report-btn"
              onClick={() => window.open("https://outlook.office.com/mail/", "_blank")}
            >
              Report Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;

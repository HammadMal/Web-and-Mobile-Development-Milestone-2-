// src/components/Attendance.jsx
import React, { useState, useEffect } from 'react';
import '../styles/attendance.css';

const attendanceData = [
    { courseName: "CS 101 - Introduction to Programming", totalClasses: 30, absences: 1, absenceDates: ["2024-10-10"] },
    { courseName: "CS 201 - Data Structures", totalClasses: 30, absences: 2, absenceDates: ["2024-09-15", "2024-10-01"] },
    { courseName: "CS 301 - Operating Systems", totalClasses: 15, absences: 3, absenceDates: ["2024-09-20", "2024-10-04", "2024-10-11"] },
    { courseName: "CS 101 - Web Development", totalClasses: 15, absences: 4, absenceDates: ["2024-09-20", "2024-09-27", "2024-10-04", "2024-10-27"] },
    { courseName: "CS 202 - DBMS", totalClasses: 30, absences: 1, absenceDates: ["2024-09-22"] },
    { courseName: "CS 401 - Advanced Algorithms", totalClasses: 30, absences: 2, absenceDates: ["2024-09-18", "2024-10-02"] }
];

function Attendance() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [recentAbsences, setRecentAbsences] = useState([]);

    useEffect(() => {
        populateAttendance();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
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

    const generateRecentAbsences = () => {
        return attendanceData
            .map(course => ({
                courseName: course.courseName,
                absenceDates: course.absenceDates.filter(isWithinLast7Days)
            }))
            .filter(course => course.absenceDates.length > 0);
    };

    const isWithinLast7Days = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
        return diffInDays <= 7 && diffInDays >= 0;
    };

    const populateAttendance = () => {
        return attendanceData.map((course) => {
            const isExpanded = selectedCourse === course;
            const colorClass = getAttendanceColor(course.totalClasses, course.absences);

            return (
                <div
                    key={course.courseName}
                    className={`rectangle ${colorClass}`}
                    onClick={() => toggleCourseDetails(course)}
                >
                    <h3>{course.courseName}</h3>
                    {isExpanded && (
                        <div className="course-info">
                            <p><strong>Total Classes:</strong> {course.totalClasses}</p>
                            <p><strong>Absences:</strong> {course.absences}</p>
                            <p><strong>Absence Dates:</strong> {course.absenceDates.map(formatDate).join(", ")}</p>
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="attendance-content">
            <section className="rectangle-container">
                {populateAttendance()}
            </section>

            <button className="recent-absences-btn" onClick={handleToggleModal}>Recent Absences</button>

            {modalVisible && (
                <div className="modal" onClick={() => setModalVisible(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
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
                                            <td>{course.absenceDates.map(date => (
                                                <span key={date} className="absence-date">{formatDate(date)}</span>
                                            )).join(", ")}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: "center" }}>No recent absences found.</td>
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

            <div className="info-box">
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
        </div>
    );
}

export default Attendance;

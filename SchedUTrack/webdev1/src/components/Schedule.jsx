// src/components/Schedule.jsx
import React, { useState } from 'react';
import '../styles/schedule.css';

function Schedule() {
    const [militaryTime, setMilitaryTime] = useState(false);
    const [showAbsences, setShowAbsences] = useState(false);

    // Sample schedule data, which can be dynamically generated or replaced with actual data
    const scheduleData = {
        "mon-9am": { courseName: "CS 101 - Introduction to Programming", color: "green" },
        "thu-9am": { courseName: "CS 101 - Introduction to Programming", color: "green" },
        "tue-9am": { courseName: "CS 201 - Data Structures", color: "yellow" },
        "wed-10am": { courseName: "CS 201 - Data Structures", color: "yellow" },
        "wed-11am": { courseName: "CS 301 - Operating Systems", color: "red" },
        "fri-10am": { courseName: "CS 301 - Operating Systems", color: "red" },
        "thu-10am": { courseName: "CS 101 - Web Development", color: "green" },
        "fri-2pm": { courseName: "CS 202 - DBMS", color: "cyan" },
        "tue-1pm": { courseName: "CS 202 - DBMS", color: "cyan" },
        "mon-1pm": { courseName: "CS 401 - Advanced Algorithms", color: "orange" },
        "tue-2pm": { courseName: "CS 401 - Advanced Algorithms", color: "orange" },
    };

    // Toggle between standard and military time
    const toggleTimeFormat = () => setMilitaryTime(!militaryTime);

    // Toggle display of absences
    const toggleAbsences = () => setShowAbsences(!showAbsences);

    const renderCourseBlock = (timeSlot) => {
        const course = scheduleData[timeSlot];
        if (course) {
            return (
                <div className={`course-block ${course.color}`}>
                    {showAbsences ? (
                        <div className="absences">
                            Absences: {Math.floor(Math.random() * 5)}
                        </div>
                    ) : (
                        course.courseName
                    )}
                </div>
            );
        }
        return null;
    };
    

    // Function to convert time format
    const formatTime = (time) => {
        if (!militaryTime) return time;
        const [hour, modifier] = time.split(" ");
        const [hours, minutes] = hour.split(":");
        let militaryHour = parseInt(hours, 10);
        if (modifier === "PM" && militaryHour !== 12) militaryHour += 12;
        if (modifier === "AM" && militaryHour === 12) militaryHour = 0;
        return `${militaryHour.toString().padStart(2, "0")}:${minutes}`;
    };

    return (
        <div className="schedule-content">
            <section className="timetable">
                <div className="grid-container">
                    {/* Weekday headers */}
                    <div className="grid-item invisible"></div>
                    <div className="grid-item">Monday</div>
                    <div className="grid-item">Tuesday</div>
                    <div className="grid-item">Wednesday</div>
                    <div className="grid-item">Thursday</div>
                    <div className="grid-item">Friday</div>

                    {/* Time and schedule cells */}
                    {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((time) => (
                        <>
                            <div className="grid-item">{formatTime(time)}</div>
                            <div className="grid-item" id={`mon-${time.replace(":00 ", "").toLowerCase()}`}>
                                {renderCourseBlock(`mon-${time.replace(":00 ", "").toLowerCase()}`)}
                            </div>
                            <div className="grid-item" id={`tue-${time.replace(":00 ", "").toLowerCase()}`}>
                                {renderCourseBlock(`tue-${time.replace(":00 ", "").toLowerCase()}`)}
                            </div>
                            <div className="grid-item" id={`wed-${time.replace(":00 ", "").toLowerCase()}`}>
                                {renderCourseBlock(`wed-${time.replace(":00 ", "").toLowerCase()}`)}
                            </div>
                            <div className="grid-item" id={`thu-${time.replace(":00 ", "").toLowerCase()}`}>
                                {renderCourseBlock(`thu-${time.replace(":00 ", "").toLowerCase()}`)}
                            </div>
                            <div className="grid-item" id={`fri-${time.replace(":00 ", "").toLowerCase()}`}>
                                {renderCourseBlock(`fri-${time.replace(":00 ", "").toLowerCase()}`)}
                            </div>
                        </>
                    ))}
                </div>
            </section>

            {/* Control buttons */}
            <div className="button-container">
                <button className="button" onClick={toggleTimeFormat}>
                    {militaryTime ? "Standard Time" : "Military Time"}
                </button>
                <button className="button" onClick={toggleAbsences}>
                    {showAbsences ? "Hide Attendance" : "Display Attendance"}
                </button>
                <button className="button">Schedule Design Mode</button>
            </div>
        </div>
    );
}

export default Schedule;

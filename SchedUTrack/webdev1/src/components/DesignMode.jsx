import React, { useState } from "react";
import Notification from "./Notification"; // Import the Notification component
import "../styles/design.css";

function DesignMode() {
  const [gridData, setGridData] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state

  const futureCourses = [
    { id: 1, courseName: "CS 501 - Machine Learning", color: "blue", startTime: "9:30", endTime: "10:30" },
    { id: 2, courseName: "CS 502 - Cloud Computing", color: "purple", startTime: "10:00", endTime: "11:00" },
    { id: 3, courseName: "CS 503 - AI Ethics", color: "teal", startTime: "1:00", endTime: "2:30" },
  ];

  const calculateTimeSlots = (startTime, endTime) => {
    const timeSlots = [];
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    for (let hour = startHour; hour <= endHour; hour++) {
      const slotStartMinute = hour === startHour ? startMinute : 0;
      const slotEndMinute = hour === endHour ? endMinute : 60;

      if (slotStartMinute < 60) {
        timeSlots.push(`${hour}:${slotStartMinute === 0 ? "00" : slotStartMinute}`);
      }

      if (slotEndMinute === 60 && hour !== endHour) {
        timeSlots.push(`${hour + 1}:00`);
      }
    }
    return timeSlots;
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });

    // Automatically hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleCourseDrop = (timeSlot, course) => {
    const { startTime, endTime } = course;
    const occupiedSlots = calculateTimeSlots(startTime, endTime);

    const clash = occupiedSlots.some((slot) => gridData[`${timeSlot}-${slot}`]);
    if (clash) {
      showNotification(`${course.courseName} overlaps with another course.`, "error");
      return;
    }

    setGridData((prevData) => {
      const newData = { ...prevData };
      occupiedSlots.forEach((slot) => {
        newData[`${timeSlot}-${slot}`] = course;
      });
      return newData;
    });

    showNotification(`${course.courseName} successfully added.`, "success");
  };

  const handleCourseRemove = (timeSlot, event) => {
    event.preventDefault();
    if (gridData[timeSlot]) {
      const courseName = gridData[timeSlot].courseName;
      setGridData((prevData) => {
        const updatedData = { ...prevData };
        Object.keys(updatedData).forEach((key) => {
          if (updatedData[key].id === gridData[timeSlot].id) {
            delete updatedData[key];
          }
        });
        return updatedData;
      });
      showNotification(`${courseName} has been removed.`, "info");
    }
  };

  const renderCourseBlock = (timeSlot) => {
    const course = gridData[timeSlot];
    if (course) {
      return (
        <div
          className={`course-block ${course.color}`}
          style={{
            gridRow: `span ${calculateTimeSlots(course.startTime, course.endTime).length}`,
          }}
        >
          <strong>{course.courseName}</strong>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="design-mode">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />

      <div className="layout">
        <main className="timetable-container">
          <div className="grid-container">
            <div className="grid-item invisible"></div>
            <div className="grid-item">Monday</div>
            <div className="grid-item">Tuesday</div>
            <div className="grid-item">Wednesday</div>
            <div className="grid-item">Thursday</div>
            <div className="grid-item">Friday</div>

            {["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"].map((time) => (
              <React.Fragment key={time}>
                <div className="grid-item time-slot">{time}</div>
                {["mon", "tue", "wed", "thu", "fri"].map((day) => (
                  <div
                    key={`${day}-${time}`}
                    className="grid-item"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const droppedCourse = JSON.parse(e.dataTransfer.getData("text/plain"));
                      handleCourseDrop(day, droppedCourse);
                    }}
                    onContextMenu={(e) => handleCourseRemove(`${day}-${time}`, e)}
                  >
                    {renderCourseBlock(`${day}-${time}`)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </main>

        <section className="courses-section">
          <h2>Available Courses</h2>
          <div className="course-list">
            {futureCourses.map((course) => (
              <div
                key={course.id}
                className={`course-block ${course.color}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify(course))}
              >
                {course.courseName}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DesignMode;

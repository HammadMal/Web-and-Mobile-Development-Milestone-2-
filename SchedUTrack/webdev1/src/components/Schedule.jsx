import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/schedule.css';

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [militaryTime, setMilitaryTime] = useState(false);
  const [showAbsences, setShowAbsences] = useState(false);
  const navigate = useNavigate();

  // Fetch schedule data
  const fetchSchedule = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/schedule', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Fetched schedule:', data);
      setScheduleData(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  // Toggle between military and standard time
  const toggleTimeFormat = () => setMilitaryTime(!militaryTime);

  // Toggle display of absences
  const toggleAbsences = () => setShowAbsences(!showAbsences);

  const formatTime = (time) => {
    if (!militaryTime) return time;
    const [hour, minute] = time.split(':');
    const isPM = time.includes('PM') || time.includes('pm');
    let militaryHour = parseInt(hour, 10);

    if (isPM && militaryHour !== 12) militaryHour += 12;
    if (!isPM && militaryHour === 12) militaryHour = 0;

    return `${militaryHour.toString().padStart(2, '0')}:${minute.replace(/[a-zA-Z]/g, '')}`;
  };

  const getAttendanceColor = (totalClasses, absences) => {
    const attendancePercentage = Math.round(((totalClasses - absences) / totalClasses) * 100);
    if (attendancePercentage >= 95) return 'green';
    if (attendancePercentage >= 85) return 'yellow';
    if (attendancePercentage >= 75) return 'red';
    return 'gray';
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
          {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
            <>
              <div className="grid-item">{formatTime(time)}</div>
              {['mon', 'tue', 'wed', 'thu', 'fri'].map((day) => {
                const timeSlot = `${day}-${time.split(':')[0].toLowerCase()}${time.includes('AM') ? 'am' : 'pm'}`;
                const course = scheduleData.find((item) => item.timeSlot === timeSlot);

                return (
                  <div key={`${day}-${time}`} className="grid-item">
                    {course ? (
                      <div className={`course-block ${getAttendanceColor(course.totalClasses, course.absences)}`}>
                        {showAbsences ? `Absences: ${course.absences}` : course.courseName}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </section>

      {/* Control buttons */}
      <div className="button-container">
        <button className="button" onClick={toggleTimeFormat}>
          {militaryTime ? 'Standard Time' : 'Military Time'}
        </button>
        <button className="button" onClick={toggleAbsences}>
          {showAbsences ? 'Hide Attendance' : 'Display Attendance'}
        </button>
        <button className="button" onClick={() => navigate('/design-mode')}>
                Schedule Design Mode
        </button>
      </div>
    </div>
  );
}

export default Schedule;

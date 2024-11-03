// src/components/Grades.jsx
import React, { useState } from 'react';
import '../styles/grades.css';

function Grades() {
    const [sgpa, setSgpa] = useState("SGPA");
    const [cgpa, setCgpa] = useState("CGPA");
    const [showSgpaNumber, setShowSgpaNumber] = useState(false);
    const [showCgpaNumber, setShowCgpaNumber] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [colorGradingMode, setColorGradingMode] = useState(false);
    const [grades, setGrades] = useState([
        { courseNumber: "CS 101", courseName: "Introduction to Programming with Python", creditHours: 3, grade: "A" },
        { courseNumber: "CS 201", courseName: "Data Structures and Algorithms", creditHours: 4, grade: "B+" },
        { courseNumber: "CS 301", courseName: "Operating Systems and Systems Programming", creditHours: 3, grade: "A-" },
        { courseNumber: "CS 101", courseName: "Web Development Fundamentals", creditHours: 3, grade: "B" },
        { courseNumber: "CS 202", courseName: "Database Management Systems", creditHours: 4, grade: "C-" },
        { courseNumber: "CS 302", courseName: "Machine Learning and Data Analysis", creditHours: 3, grade: "A-" },
    ]);
    const [originalGrades, setOriginalGrades] = useState([]);

    // Toggle SGPA and CGPA display
    const toggleGpaDisplay = (isSgpa) => {
        if (isSgpa) {
            setShowSgpaNumber(!showSgpaNumber);
            setSgpa(showSgpaNumber ? "SGPA" : "3.2");
        } else {
            setShowCgpaNumber(!showCgpaNumber);
            setCgpa(showCgpaNumber ? "CGPA" : "2.8");
        }
    };

    // Toggle "What If" mode
    const toggleWhatIfMode = () => {
        if (editingMode) {
            // Revert to original grades when exiting "What If" mode
            setGrades(originalGrades);
        } else {
            // Store current grades as original before editing
            setOriginalGrades(grades.map(course => ({ ...course })));
        }
        setEditingMode(!editingMode); // Toggle editing mode
    };

    const toggleColorGradingMode = () => {
        setColorGradingMode(!colorGradingMode);
    };

    const getColorForGrade = (grade) => {
        if (["A", "A-", "B+"].includes(grade)) return "green";
        if (["B", "B-", "C+"].includes(grade)) return "yellow";
        return "red";
    };

    // Handle grade change in editable mode
    const handleGradeChange = (index, newGrade) => {
        const updatedGrades = [...grades];
        updatedGrades[index].grade = newGrade;
        setGrades(updatedGrades);
    };

    return (
        <div className="grades-section">
            {/* SGPA and CGPA Display */}
            <div className="gpa-container">
                <div className="gpa-box" onClick={() => toggleGpaDisplay(true)}>
                    <h2>{sgpa}</h2>
                </div>
                <div className="gpa-box" onClick={() => toggleGpaDisplay(false)}>
                    <h2>{cgpa}</h2>
                </div>
            </div>

            {/* Current Semester Table */}
            <h2 className="table-heading">Current Semester</h2>
            <div className="grades-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course Number</th>
                            <th>Course Name</th>
                            <th>Credit Hours</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((course, index) => (
                            <tr key={index} style={{ backgroundColor: colorGradingMode ? getColorForGrade(course.grade) : '' }}>
                                <td>{course.courseNumber}</td>
                                <td>{course.courseName}</td>
                                <td>{course.creditHours}</td>
                                <td
                                    contentEditable={editingMode}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleGradeChange(index, e.target.innerText)}
                                >
                                    {course.grade}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Buttons */}
            <button className="what-if-button" onClick={toggleWhatIfMode}>
                {editingMode ? "Revert" : "What If"}
            </button>
            <button className="what-if-button" onClick={toggleColorGradingMode} style={{ bottom: "100px" }}>
                {colorGradingMode ? "Revert Colours" : "Colour-Grade"}
            </button>
        </div>
    );
}

export default Grades;

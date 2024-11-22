import React, { useEffect, useState } from 'react';
import '../styles/grades.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Grades() {
    const [sgpa, setSgpa] = useState("SGPA");
    const [cgpa, setCgpa] = useState("CGPA");
    const [showSgpaNumber, setShowSgpaNumber] = useState(false);
    const [showCgpaNumber, setShowCgpaNumber] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [colorGradingMode, setColorGradingMode] = useState(false);
    const [grades, setGrades] = useState([]);
    const [pastGrades, setPastGrades] = useState([]);
    const [originalGrades, setOriginalGrades] = useState([]);
    const [showInfoBox, setShowInfoBox] = useState(false);

    const gradeToPoint = {
        "A+": 4.0, "A": 4.0, "A-": 3.67,
        "B+": 3.33, "B": 3.0, "B-": 2.67,
        "C+": 2.33, "C": 2.0, "C-": 1.67,
        "F": 0.0
    };

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/grades', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setGrades(data.grades);
            setPastGrades(data.past_course_grades || []);
        } catch (err) {
            console.error("Error fetching grades:", err);
        }
    };

    const calculateGPA = (grades) => {
        if (!grades || grades.length === 0) return 0;

        const totalPoints = grades.reduce((acc, grade) => {
            return acc + gradeToPoint[grade.grade] * grade.credits;
        }, 0);

        const totalCredits = grades.reduce((acc, grade) => acc + grade.credits, 0);
        return (totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2));
    };

    const getColorForGrade = (grade) => {
        // Color coding for letter grades from green to grey
        switch (grade) {
            case "A+":
            case "A":
                return "green";
            case "A-":
                return "#4caf50"; // Light green
            case "B+":
                return "#8bc34a"; // Lime green
            case "B":
                return "#cddc39"; // Lime
            case "B-":
                return "#ffc107"; // Yellow
            case "C+":
                return "#ff9800"; // Orange
            case "C":
                return "#ff5722"; // Deep orange
            case "C-":
                return "gray";
            case "F":
                return "red";
            default:
                return "transparent";
        }
    };

    const getColorForGPA = (gpa) => {
        if (gpa >= 3.5) return "green";
        if (gpa >= 3.0) return "#ffc107"; // Yellow
        if (gpa >= 2.5) return "red";
        return "grey";
    };

    const toggleWhatIfMode = () => {
        if (editingMode) {
            setGrades(originalGrades);
            setSgpa(calculateGPA(originalGrades));
            setCgpa(calculateGPA([...originalGrades, ...pastGrades]));
        } else {
            setOriginalGrades([...grades]);
        }
        setEditingMode(!editingMode);
    };

    const toggleColorGradingMode = () => setColorGradingMode(!colorGradingMode);

    const toggleInfoBox = () => setShowInfoBox(!showInfoBox);

    const handleGradeChange = (index, newGrade) => {
        if (!gradeToPoint.hasOwnProperty(newGrade)) {
            toast.error('Invalid grade entered. Please enter a valid grade (e.g., A, B+, etc.)', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                style: { backgroundColor: 'red', color: 'white' },
            });
            return;
        }

        const updatedGrades = [...grades];
        updatedGrades[index].grade = newGrade;
        setGrades(updatedGrades);

        setSgpa(calculateGPA(updatedGrades));
        setCgpa(calculateGPA([...updatedGrades, ...pastGrades]));
    };

    useEffect(() => {
        setSgpa(calculateGPA(grades));
        setCgpa(calculateGPA([...grades, ...pastGrades]));
    }, [grades, pastGrades]);

    const totalCredits = grades.reduce((sum, course) => sum + course.credits, 0) +
        pastGrades.reduce((sum, course) => sum + course.credits, 0);

    return (
        <div className="grades-section">
            <ToastContainer />
            <div className="gpa-container">
                <div
                    className="gpa-box"
                    onClick={() => setShowSgpaNumber(!showSgpaNumber)}
                    style={{
                        backgroundColor: showSgpaNumber && sgpa !== "SGPA"
                            ? getColorForGPA(parseFloat(sgpa))
                            : ''
                    }}
                >
                    <h2>{showSgpaNumber ? sgpa : "SGPA"}</h2>
                </div>
                <div
                    className="gpa-box"
                    onClick={() => setShowCgpaNumber(!showCgpaNumber)}
                    style={{
                        backgroundColor: showCgpaNumber && cgpa !== "CGPA"
                            ? getColorForGPA(parseFloat(cgpa))
                            : ''
                    }}
                >
                    <h2>{showCgpaNumber ? cgpa : "CGPA"}</h2>
                </div>
            </div>

            <h2 className="table-heading">Current Semester</h2>
            <div className="grades-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Credit Hours</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((course, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: colorGradingMode ? getColorForGrade(course.grade) : ''
                                }}
                            >
                                <td>{course.coursename}</td>
                                <td>{course.credits}</td>
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

            <h2 className="table-heading">Past Grades</h2>
            <div className="grades-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Credit Hours</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastGrades.map((course, index) => (
                            <tr key={index}>
                                <td>{course.coursename}</td>
                                <td>{course.credits}</td>
                                <td>{course.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="what-if-button" onClick={toggleInfoBox} style={{ bottom: "160px" }}>
                Info
            </button>
            <button className="what-if-button" onClick={toggleColorGradingMode} style={{ bottom: "100px" }}>
                {colorGradingMode ? "Revert Colours" : "Colour-Grade"}
            </button>
            <button className="what-if-button" onClick={toggleWhatIfMode}>
                {editingMode ? "Revert" : "What If"}
            </button>

            {showInfoBox && (
                <div className="info-box">
                    <div className="info-box-header">
                        <h3>Grade to GPA Mapping</h3>
                        <button className="close-button" onClick={toggleInfoBox}>×</button>
                    </div>
                    <table className="info-table">
                        <thead>
                            <tr>
                                <th>Letter Grade</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(gradeToPoint).map(([grade, gpa]) => (
                                <tr key={grade}>
                                    <td>{grade}</td>
                                    <td>{gpa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="info-total-credits">
                        <h4>Total Credits Taken: {totalCredits}</h4>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grades;

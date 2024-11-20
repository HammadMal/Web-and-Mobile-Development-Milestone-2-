import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

function Homepage() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            console.log("Starting fetch for courses...");
            try {
                const token = localStorage.getItem('token');
                console.log("Token from localStorage:", token);

                const response = await fetch('http://localhost:5000/api/courses', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error("Fetch error response text:", errorMessage);
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    const data = await response.json();
                    console.log("Courses fetched successfully:", data);
                    setCourses(data);
                }
            } catch (error) {
                console.error('Fetch error:', error.message);
                setError('Failed to fetch courses.');
            }
        };

        fetchCourses();
    }, []);

    console.log("Rendering homepage, courses:", courses);

    return (
        <div className="homepage-content">
            <section className="rectangle-container">
                {courses.length > 0 ? courses.map((course, index) => (
                    <Link
                        key={index}
                        to={{
                            pathname: '/tasks',
                        }}
                        state={{ selectedCourse: course.coursename }} // Pass course name as state
                        className={`rectangle rectangle-${(index % 6) + 1}`}
                    >
                        <h3>{`${course.coursenameId} ${course.coursename}`}</h3>
                    </Link>
                )) : <p>{error || 'Loading courses...'}</p>}
            </section>
        </div>
    );
}

export default Homepage;

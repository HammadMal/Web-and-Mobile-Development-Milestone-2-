// src/components/AboutUs.jsx
import React from 'react';
import '../styles/about_us.css';

function AboutUs() {
    return (
        <div className="content-wrapper">
            <img className="about-image" src="/habib_image.jpeg" alt="Habib University" />
            <div className="about-text">
                <h1>About SchedUTrack</h1>
                <p>Welcome to SchedUTrack! Here’s a brief overview of what we do...</p>

                <h2>Our Mission</h2>
                <p>
                    SchedUTrack is dedicated to enhancing the academic journey of university students by providing an integrated, 
                    user-friendly platform that centralizes academic management. Our mission is to empower students to seamlessly 
                    organize their schedules, track attendance, manage tasks, and monitor grades, fostering a productive academic experience.
                </p>

                <h2>About Us</h2>
                <p>
                    Founded at Habib University, SchedUTrack arose from the pressing need to simplify the complexities university 
                    students face in managing their academic lives. We understand the challenges of juggling multiple courses, deadlines, 
                    and attendance. SchedUTrack consolidates essential academic functions into one accessible platform, helping students 
                    stay on top of their responsibilities and avoid academic penalties.
                </p>

                <div className="values-section">
                    <p><img src="/book_icon.png" alt="Book Icon" className="value-icon" /> <strong>Innovation:</strong> We strive to continually improve and innovate, ensuring our platform meets the evolving needs of modern students.</p>
                    <p><img src="/book_icon.png" alt="Book Icon" className="value-icon" /> <strong>Reliability:</strong> SchedUTrack is built to be a dependable resource for students, providing accurate and timely information to support their academic endeavors.</p>
                    <p><img src="/book_icon.png" alt="Book Icon" className="value-icon" /> <strong>User-Centric Design:</strong> We prioritize intuitive design and functionality, enhancing organizational skills and academic productivity for all students.</p>
                </div>
            </div>

            <footer className="contact-bar">
                <div className="footer-content">
                    <p className="footer-heading">For any queries, contact us at:</p>
                    <div className="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <span>Phone: (123) 456-7890</span>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <span>Email: support@schedutrack.com</span>
                        </div>
                    </div>
                    <div className="branding">
                        <span>SchedUTrack</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default AboutUs;

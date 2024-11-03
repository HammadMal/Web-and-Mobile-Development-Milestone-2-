// src/components/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

function Homepage() {
  return (
    <div className="homepage-content">
      <section className="rectangle-container">
        <Link to="/tasks" className="rectangle rectangle-1">
          <h3>CS 101: Introduction to Programming with Python</h3>
        </Link>
        <Link to="/tasks" className="rectangle rectangle-2">
          <h3>CS 201: Data Structures and Algorithms</h3>
        </Link>
        <Link to="/tasks" className="rectangle rectangle-3">
          <h3>CS 301: Operating Systems and Systems Programming</h3>
        </Link>
        <Link to="/tasks" className="rectangle rectangle-4">
          <h3>CS 101: Web Development Fundamentals</h3>
        </Link>
        <Link to="/tasks" className="rectangle rectangle-5">
          <h3>CS 202: Database Management Systems</h3>
        </Link>
        <Link to="/tasks" className="rectangle rectangle-6">
          <h3>CS 302: Machine Learning and Data Analysis</h3>
        </Link>
      </section>
    </div>
  );
}

export default Homepage;

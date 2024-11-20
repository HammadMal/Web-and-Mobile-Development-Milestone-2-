import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/add_task.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTask({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState([]);

  // Fetch courses independently within AddTask component
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !dueDate || !courseName) {
      toast.error("Please fill out all details!");
      return;
    }

    const newTask = {
      taskName,
      dueDate: dueDate.toISOString().split('T')[0],
      taskType: courseName,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/add-task', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      // Show success notification
      toast.success("Task added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: 'green', color: 'white' }
      });

      // Reset the form
      setTaskName('');
      setDueDate(null);
      setCourseName('');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="add-task-content">
      <div className="add-task-card">
        <h1 className="add-task-heading">Add a New Task</h1>
        <p className="add-task-description">
          Fill out this form to add new tasks to your task list.
        </p>
        <form className="add-task-form" onSubmit={handleSubmit}>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            className="add-task-input"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          <label htmlFor="dueDate">Due Date:</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Due Date"
            className="add-task-input"
          />

          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            className="add-task-select"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course.coursename}>{course.coursename}</option>
            ))}
            <option value="Personal">Personal</option>
          </select>

          <input type="submit" value="Add Task" className="add-task-submit" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddTask;

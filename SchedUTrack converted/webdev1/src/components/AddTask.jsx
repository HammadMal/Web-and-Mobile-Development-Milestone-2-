// src/components/AddTask.jsx
import React, { useState } from 'react';
import '../styles/add_task.css';

function AddTask({ tasksData, addTask }) {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [courseName, setCourseName] = useState('');

  const courseOptions = tasksData.map((course, index) => (
    <option key={index} value={course.courseName}>{course.courseName}</option>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !dueDate || !courseName) {
      alert("Please fill out all details!");
      return;
    }

    const newTask = {
      name: taskName,
      dueDate: dueDate,
      completed: false,
    };

    addTask(courseName, newTask);

    alert("Task added successfully!");
    setTaskName('');
    setDueDate('');
    setCourseName('');
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
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="add-task-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
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
            {courseOptions}
          </select>

          <input type="submit" value="Add Task" className="add-task-submit" />
        </form>
      </div>
    </div>
  );
}

export default AddTask;

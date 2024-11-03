// src/components/Tasks.jsx
import React from 'react';
import '../styles/task.css';

function Tasks({ tasksData }) {
    const colors = ['green', 'yellow', 'red', 'cyan', 'orange'];

    return (
        <div className="tasks-page">
            <section className="tasks-section">
                <h1 className="section-title">Your Upcoming Tasks</h1>
                <div className="tasks-container">
                    {tasksData.map((course, index) => (
                        <div className="task-group" key={course.courseName}>
                            <div className={`task-header ${colors[index % colors.length]}`}>
                                {course.courseName}
                            </div>
                            {course.tasks.length > 0 ? (
                                course.tasks.map((task, taskIndex) => (
                                    <div className="task-item" key={taskIndex}>
                                        <span className="task-name">{task.name}</span>
                                        <span className="due-date">{task.dueDate}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="task-item no-tasks">No tasks assigned</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Tasks;

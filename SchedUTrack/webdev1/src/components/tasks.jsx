// src/components/Tasks.jsx
import React, { useEffect, useState } from 'react';
import '../styles/task.css';

function Tasks() {
    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedTask, setSelectedTask] = useState(null); // State to track selected task
    const colors = ['green', 'yellow', 'red', 'cyan', 'orange'];

    useEffect(() => {
        const fetchCoursesAndTasks = async () => {
            try {
                const responseCourses = await fetch('http://localhost:5000/api/courses', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                const responseTasks = await fetch('http://localhost:5000/api/tasks', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!responseCourses.ok) throw new Error(`HTTP error! status: ${responseCourses.status}`);
                if (!responseTasks.ok) throw new Error(`HTTP error! status: ${responseTasks.status}`);

                const coursesData = await responseCourses.json();
                const tasksData = await responseTasks.json();

                setCourses(coursesData);
                setTasks(tasksData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchCoursesAndTasks();
    }, []);

    const handleCompleteClick = (task) => {
        setSelectedTask(task); // Set the task to be confirmed
        setShowModal(true); // Show the confirmation modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
        setSelectedTask(null); // Clear the selected task
    };

    const handleDeleteTask = async () => {
        try {
            const taskId = selectedTask._id;

            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            // Remove task from local state
            setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));

            // Close the modal
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const getTasksForCourse = (courseName) => {
        return tasks.filter(task => task.taskType === courseName);
    };

    const personalTasks = tasks.filter(task => task.taskType === "Personal");

    return (
        <div className="tasks-page">
            <section className="tasks-section">
                <h1 className="section-title">Your Upcoming Tasks</h1>
                <div className="tasks-container">
                    {courses.map((course, index) => (
                        <div className="task-group" key={course.coursenameId}>
                            <div className={`task-header ${colors[index % colors.length]}`}>
                                {`${course.coursenameId} - ${course.coursename}`}
                            </div>
                            {getTasksForCourse(course.coursename).length > 0 ? (
                                getTasksForCourse(course.coursename).map((task, taskIndex) => (
                                    <div className="task-item" key={taskIndex}>
                                        <span className="task-name">{task.taskName}</span>
                                        <span className="due-date">{task.dueDate}</span>
                                        <button className="complete-button" onClick={() => handleCompleteClick(task)}>
                                            Completed
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="task-item no-tasks">No tasks assigned</div>
                            )}
                        </div>
                    ))}

                    <div className="task-group">
                        <div className="task-header green">Personal Tasks</div>
                        {personalTasks.length > 0 ? (
                            personalTasks.map((task, taskIndex) => (
                                <div className="task-item" key={taskIndex}>
                                    <span className="task-name">{task.taskName}</span>
                                    <span className="due-date">{task.dueDate}</span>
                                    <button className="complete-button" onClick={() => handleCompleteClick(task)}>
                                        Completed
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="task-item no-tasks">No personal tasks assigned</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Are you sure this task is completed?</h3>
                        <p>This action will permanently remove the task.</p>
                        <button className="modal-button yes-button" onClick={handleDeleteTask}>
                            Yes
                        </button>
                        <button className="modal-button no-button" onClick={handleCloseModal}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;

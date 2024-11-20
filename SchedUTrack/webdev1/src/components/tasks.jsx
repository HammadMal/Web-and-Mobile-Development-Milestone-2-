import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/task.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tasks() {
    const [courses, setCourses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const colors = ['green', 'yellow', 'red', 'cyan', 'orange'];

    const location = useLocation();
    const selectedCourse = location.state?.selectedCourse;

    useEffect(() => {
        const fetchCoursesAndTasks = async () => {
            console.log("Fetching courses and tasks...");
            try {
                // Fetch courses
                const responseCourses = await fetch('http://localhost:5000/api/courses', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!responseCourses.ok) throw new Error(`HTTP error! status: ${responseCourses.status}`);

                const coursesData = await responseCourses.json();
                console.log("Fetched courses:", coursesData); // Debugging
                setCourses(coursesData);

                // Fetch tasks
                const responseTasks = await fetch('http://localhost:5000/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!responseTasks.ok) throw new Error(`HTTP error! status: ${responseTasks.status}`);

                const tasksData = await responseTasks.json();
                console.log("Fetched tasks:", tasksData); // Debugging
                setTasks(tasksData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchCoursesAndTasks();
    }, []);

    const handleCompleteClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

    const handleDeleteTask = async () => {
        try {
            const taskId = selectedTask._id;

            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

            toast.error('Task Deleted Successfully!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: { backgroundColor: 'red', color: 'white' },
            });

            handleCloseModal();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Reorder tasks to place selectedCourse tasks at the top
    const reorderedTasks = selectedCourse
        ? [
              ...tasks.filter((task) => task.taskType === selectedCourse), // Selected course tasks
              ...tasks.filter((task) => task.taskType !== selectedCourse), // Other tasks
          ]
        : tasks;

    const personalTasks = tasks.filter((task) => task.taskType === 'Personal');

    useEffect(() => {
        console.log("Selected course:", selectedCourse); // Debugging
        console.log("All tasks:", tasks); // Debugging
        console.log("Reordered tasks:", reorderedTasks); // Debugging
        console.log("Personal tasks:", personalTasks); // Debugging
    }, [selectedCourse, tasks]);

    return (
        <div className="tasks-page">
            <section className="tasks-section">
                <h1 className="section-title">Your Upcoming Tasks</h1>
                <div className="tasks-container">
                    {reorderedTasks.length > 0 ? (
                        reorderedTasks.map((task, index) => (
                            <div className="task-group" key={index}>
                                <div className={`task-header ${colors[index % colors.length]}`}>
                                    {task.taskType === 'Personal' ? 'Personal Tasks' : task.taskType}
                                </div>
                                <div className="task-item">
                                    <span className="task-name">{task.taskName}</span>
                                    <span className="due-date">{task.dueDate}</span>
                                    <button
                                        className="complete-button"
                                        onClick={() => handleCompleteClick(task)}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="task-group">
                            <div className="task-item no-tasks">No tasks assigned</div>
                        </div>
                    )}
                </div>
            </section>

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
            <ToastContainer />
        </div>
    );
}

export default Tasks;

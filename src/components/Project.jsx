import React from 'react';
import { useState } from 'react';
import './App.css';
import Task from './Task.jsx';

const Project = ({ e, i, projectName }) => {
    const [tasks, setTasks] = useState([]);
    const [index, setIndex] = useState(i);
    const [name, projectName] = useState(projectName);

    const handleProjectTaskInput = (e, date) => {
        task = e.target.value;
        const dateKey = generateDateKey(date);
        if (e.key === "Enter" && task.trim() !== "") {
            // Add task to the calendar
            if (!calendarTasks[dateKey]) {
                calendarTasks[dateKey] = [];
            }

            setCalendarTasks({
                ...calendarTasks,
                [dateKey]: [...calendarTasks[dateKey], task]
            });

            // Add task to the general task manager
            setTasks([...tasks, task]);

            // Clear the input field after adding
            e.target.value = "";
        }
    };

    return (
        <div className="project-container">
            <div className="project-header">
                {projectName}
            </div>
            <div className="project-tasks">
                {tasks.map((task) => (
                    <Task
                    >

                    </Task>
                ))}

            </div>
            <div className="input-container">
                {/* Input for adding tasks directly in the calendar */}
                <input
                    type="text"
                    placeholder="+"
                    onKeyPress={(e) => handleProjectTaskInput(e, day.date)}
                />
            </div>
        </div>
    )

}

export default Project;
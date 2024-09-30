import React from 'react';
import { useState } from 'react';

const Task = ({}) => {
    const [taskText, setTaskText] = useState(null);
    const [isComplete, setComplete] = useState(false);
    const [isProject, setProject] = useState(false);
    const [isChecked, setChecked] = useState(false);

    return (
        <div
            key={i}
            draggable
            onDragStart={(e) => onDragStart(e, task, day.date)}
            onDrop={(e) => onDrop(e, day.date, i)}
            onDragOver={allowDrop}
            onClick={(e) => toggleTaskCompletion(e, task, generateDateKey(day.date))} // Add click handler
            className={`dropped-task ${task.complete ? 'complete' : ''}`}
        >
            {task}
        </div >
    )

}

export default Task;

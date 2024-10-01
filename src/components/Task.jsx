import React from 'react';
import { useState } from 'react';
import './App.css'

const Task = ({ i, task, project, list, day }) => {
    const [taskText, setTaskText] = useState(task);
    const [isComplete, setComplete] = useState(false);
    const [isProject, setProject] = useState(project);
    const [inList, setInList] = useState(list);
    const [dateKey, setDateKey] = useState(generateDateKey(date));
    const [index, setIndex] = useState(i);
    const childRef = useRed(null);

    const onDragStart = (e) => {
        console.log("onDragStart");
        e.dataTransfer.setData("task", JSON.stringify(task))
    };

    const onDrop = (e) => {
        const parentDiv = childRef.current.parentNode;
        
    }

    const toggleTaskCompletion = () => {
        if (!inList) {
            setComplete(!isComplete);
        }
    };

    const generateDateKey = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div
            key={i}
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDrop={(e) => onDrop(e)}
            onDragOver={allowDrop}
            onClick={(e) => toggleTaskCompletion()} // Add click handler
            className={`dropped-task ${task.complete ? 'complete' : ''}`}
        >
            {taskText}
        </div >
    )

}

export default Task;

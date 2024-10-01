import React from 'react';
import { useState } from 'react';
import './App.css'
import Task from './Task.jsx'

const DayCell = ({ e, index, currentMonth, currentDay, day, month, year, cellDate }) => {
    const [dayTasks, setDayTasks] = useState([]);
    const [isCurrentMonth, setIsCurrentMonth] = useState(currentMonth);
    const [isCurrentDay, setIsCurrentDay] = useState(currentDay);
    const dateDay = day;
    const dateMonth = month;
    const yeadateYearr = year;
    const date = cellDate;

    const onDrop = (e) => {
        
    }

    return (
        <div
            key={index}
            className={`calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isCurrentDay ? 'current-day' : ''}`}
        >
            <div>{day.day}</div>
            {/* Droppable Task Area */}
            <div
                className="task-drop-area"
                onDrop={(e) => onDrop(e, date, index)}
                onDragOver={allowDrop}
            >
                {(calendarTasks[generateDateKey(day.date)] || []).map((task, i) => (
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
                ))}
                {/* This div acts as a drop target for adding tasks to the bottom of the list */}
                <div
                    className="task-drop-target"
                    onDrop={(e) => onDrop(e, day.date, calendarTasks[generateDateKey(day.date)]?.length || 0)}
                    onDragOver={allowDrop}
                />
            </div>

            <div className="input-container">
                {/* Input for adding tasks directly in the calendar */}
                <input
                    type="text"
                    placeholder="+"
                    onKeyPress={(e) => handleCalendarTaskInput(e, day.date)}
                />
            </div>
        </div>
    )
}
export default DayCell;
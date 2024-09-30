import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Page1 from "./pages/Page1.jsx"
import Page2 from "./pages/Page2.jsx"
import Checkbox from './components/Checkbox';

import React, { useState } from 'react';
import './App.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [complete, setComplete] = useState([
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: false },
    { text: 'Task 3', completed: false },
  ]);
  const [checkTasks, setCheckTasks] = useState([
    { checkTask: 'Task 1', completed: false },
    { checkTask: 'Task 2', completed: false },
    { checkTask: 'Task 3', completed: false },
  ]);
  const [calendarTasks, setCalendarTasks] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedTaskDay, setDraggedTaskDay] = useState(null);

  const [calendarWidth, setCalendarWidth] = useState(50); // in percentage


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // Store today's date in formatted form for easy comparison
  const todayFormatted = formatDate(new Date());

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDayOfLastMonth = new Date(year, month, 0);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInLastMonth = lastDayOfLastMonth.getDate();

  const calendarDays = [];
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInLastMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInLastMonth - i),
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i),
    });
  }
  const totalCells = 42;
  for (let i = calendarDays.length; i < totalCells; i++) {
    calendarDays.push({
      day: i - daysInMonth + 1,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i - daysInMonth + 1),
    });
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleTaskInput = (e) => {
    setNewTask(e.target.value);
  };

  const toggleTaskCompletion = (task) => {
    const updatedComplete = complete.map((t) => 
      t.text === task.text ? { ...t, completed: !t.completed } : t
    );
    setComplete(updatedComplete);
  };


  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {

      

      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const onDragStart = (e, task, dayDate = null) => {
    if (dayDate) {
      setDraggedTask({task, dayDate: generateDateKey(dayDate)});
    } else {
      setDraggedTask({task, dayDate: -1});
    }
    
    
  };

  const generateDateKey = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const onDrop = (e, dayDate, dropIndex) => {
    e.preventDefault();
    const dateKey = generateDateKey(dayDate);

    // If dropping a task from the task manager
    if (draggedTask.dayDate === -1) {
      console.log("******");
      // Add task to the respective day
      const { task } = draggedTask;
      const newTasksForDay = [...(calendarTasks[dateKey] || []), task];

      setCalendarTasks({
        ...calendarTasks,
        [dateKey]: newTasksForDay,
      });

    } else {
      // If dropping in the same day
      const newTasksForDay = [...calendarTasks[dateKey]];
      console.log("/////");

      // Find the index of the dragged task
      const draggedTaskIndex = newTasksForDay.indexOf(draggedTask.task);

      // Remove the task from its original position
      newTasksForDay.splice(draggedTaskIndex, 1);

      // Insert it at the new position (dropIndex)
      newTasksForDay.splice(dropIndex, 0, draggedTask.task);

      setCalendarTasks({
        ...calendarTasks,
        [dateKey]: newTasksForDay,
      });
    }

    // Reset dragged task state
    setDraggedTask(null);
  };


  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleCalendarTaskInput = (e, date) => {
    const task = e.target.value;
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

  const handleDragDivider = (e) => {
    e.preventDefault();
    const newCalendarWidth = (e.clientX / window.innerWidth) * 100;
    setCalendarWidth(Math.max(20, Math.min(newCalendarWidth, 80))); // Limiting width between 20% and 80%
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleDragDivider);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleDragDivider);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleCheckboxChange = (checkTask) => {
    setCheckTasks(checkTasks.map((t) => (t.checkTask === checkTask ? { ...t, completed: !t.completed } : t)));
  };

  const isToday = (dayDate) => formatDate(dayDate) === todayFormatted;

  return (
    <div className="app-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
        <div className="today-button">
          <button onClick={goToToday}>Today</button>
        </div>
        <div className="calendar-body">
          <div className="calendar-weekdays">
            {weekdays.map((weekday) => (
              <div key={weekday} className="calendar-weekday">
                {weekday}
              </div>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${isToday(day.date) ? 'current-day' : ''}`}
                onDrop={(e) => onDrop(e, day.date, index)}
                onDragOver={allowDrop}
              >
                <div>{day.day}</div>
                {/* Droppable Task Area */}
                <div className="task-drop-area">
                  {(calendarTasks[generateDateKey(day.date)] || []).map((task, i) => (
                      <div
                        key={i}
                        className="dropped-task"
                        draggable
                        onDragStart={(e) => onDragStart(e, task, day.date)}
                        onDrop={(e) => onDrop(e, day.date, i)}
                        onDragOver={allowDrop}
                      >
                        {task}
                      </div>
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
            ))}
          </div>
        </div>
      </div>

        {/* Divider */}
        {/* <div
        className="divider"
        onMouseDown={() => {
          document.addEventListener("mousemove", handleDragDivider);
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleDragDivider);
          });
        }}
      /> */}

      {/* Task Management Section */}
      <div className="task-section">
      <div className="task-section-header">
        <h2>My Tasks</h2>
      </div>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new project..."
            value={newTask}
            onChange={handleTaskInput}
          />
          <button type="submit">+</button>
        </form>
        <div className="tasks-container">
          {tasks.map((task, index) => (
            <div key={index} className="task-container">
              <Checkbox
                isChecked={task.completed}
                handleCheckboxChange={handleCheckboxChange}
              />
              <h1
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, task)}
              >
                {task}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

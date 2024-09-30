import React from 'react';
import './Checkbox.css'

const Checkbox = ({ task, isChecked, handleCheckboxChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheckboxChange(task)}
      />
      {task}
    </label>
  );
};

export default Checkbox;

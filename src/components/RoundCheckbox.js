/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export const RoundCheckbox = (props) => {
  return (
    <div className="round-checkbox">
      {/* <div className="round-checkbox__wrapper"> */}
      <div
        className={
          props.task.priority === 1
            ? 'round-checkbox__wrapper round-checkbox__wrapper--priority-1'
            : props.task.priority === 2
            ? 'round-checkbox__wrapper round-checkbox__wrapper--priority-2'
            : props.task.priority === 3
            ? 'round-checkbox__wrapper round-checkbox__wrapper--priority-3'
            : props.task.priority === 4
            ? 'round-checkbox__wrapper round-checkbox__wrapper--priority-4'
            : props.task.priority === 5
            ? 'round-checkbox__wrapper round-checkbox__wrapper--priority-5'
            : 'round-checkbox__wrapper'
        }
      >
        <input
          className="task__view-template-checkbox"
          id={props.task.id}
          type="checkbox"
          defaultChecked={props.task.isCompleted}
          onChange={() => props.toggleTaskCompleted()}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={props.task.id} />
      </div>
    </div>
  );
};

/* eslint-disable no-empty */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {
  FaRegTrashAlt,
  FaRegTimesCircle,
  FaRegCheckCircle,
  FaPencilAlt,
} from 'react-icons/fa';
import { usePrevious } from '../Hooks';
import { RoundCheckbox } from './RoundCheckbox';
import { DateTimePicker } from './DateTimePicker';
import { Scheduler } from './Scheduler';
import { PrioritySelectorPopover } from './PrioritySelectorPopover';

export const Task = (props) => {
  const [task, setTask] = useState(props.task);
  const [isEditing, setEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const wasEditing = usePrevious(isEditing);
  const taskEditRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [haveMouseEntered, setMouseEntered] = useState(false);
  const [haveDescription, setHaveDescription] = useState(
    task.description && task.description.trim() !== ''
  );

  const handleTaskNameChange = (e) => {
    setNewTaskName(e.target.value);
  };
  const handleTaskDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };
  const handleEditTask = (e) => {
    // Shift + Enter pressed. Add a line break character
    // instead of editing the task.
    if (e.keyCode === 13 && e.shiftKey) {
    } else if (
      (e.key === 'Enter' ||
        e.currentTarget.className === 'task__edit-template-save-editing') &&
      newTaskName.trim() !== ''
    ) {
      props.editTask(props.task, newTaskName.trim(), newTaskDescription.trim());
      task.name = newTaskName.trim();
      task.description = newTaskDescription.trim();
      setTask(task);
      setEditing(!isEditing);
    } else if (e.key === 'Escape') {
      setEditing(!isEditing);
    }
  };
  const handleTaskUpdate = (pTask) => {
    setTask(pTask);
    props.updateTask(pTask);
  };
  const toggleTaskCompleted = () => {
    task.isCompleted = !task.isCompleted;
    setTask(task);
    props.updateTask(task);
  };
  const toggleEditMode = () => {
    setNewTaskName(task.name);
    setNewTaskDescription(task.description);
    setEditing(!isEditing);
  };

  const viewTemplate = (
    <div className="task__view-template">
      <RoundCheckbox toggleTaskCompleted={toggleTaskCompleted} task={task} />
      <div className="task__view-template-content">
        <div
          className={
            task.isCompleted
              ? 'task__view-template-name task__view-template-name--completed'
              : 'task__view-template-name'
          }
          onClick={toggleEditMode}
        >
          {task.name}
        </div>
        {haveDescription && (
          <div
            className="task__view-template-description"
            onClick={toggleEditMode}
          >
            {task.description}
          </div>
        )}
        <DateTimePicker task={task} handleTaskUpdate={handleTaskUpdate} />
      </div>
      <Scheduler
        haveMouseEntered={haveMouseEntered}
        task={task}
        handleTaskUpdate={handleTaskUpdate}
      />
      <button
        className="task__view-template-edit"
        type="button"
        onClick={toggleEditMode}
      >
        <FaPencilAlt />
      </button>
      <button
        className="task__view-template-delete"
        type="button"
        onClick={() => props.showDeleteTaskModal(task)}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
  const editTemplate = (
    <div className="task__edit-template">
      <RoundCheckbox toggleTaskCompleted={toggleTaskCompleted} task={task} />
      <div className="task__edit-template-content">
        <TextareaAutosize
          className="task__edit-template-edit-task-name"
          type="text"
          value={newTaskName}
          onChange={handleTaskNameChange}
          onKeyDown={handleEditTask}
          ref={taskEditRef}
          minRows={1}
          maxRows={4}
          placeholder="Title"
        />
        <TextareaAutosize
          className="task__edit-template-edit-task-description"
          type="text"
          value={newTaskDescription}
          onChange={handleTaskDescriptionChange}
          onKeyDown={handleEditTask}
          minRows={1}
          maxRows={4}
          placeholder="Description"
        />
      </div>
      <div className="task__edit-template-buttons">
        <div className="task__edit-template-buttons-top">
          <button
            className="task__edit-template-save-editing"
            type="button"
            onClick={handleEditTask}
          >
            <FaRegCheckCircle />
          </button>
          <button
            className="task__edit-template-cancel-editing"
            type="button"
            onClick={() => setEditing(!isEditing)}
          >
            <FaRegTimesCircle />
          </button>
        </div>
        <div className="task__edit-template-buttons-bottom">
          <PrioritySelectorPopover
            task={task}
            handleTaskUpdate={handleTaskUpdate}
          />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      taskEditRef.current.focus();
    }
    setHaveDescription(task.description && task.description.trim() !== '');
  });

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <li
      className="task"
      key={task.id}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    >
      {isEditing ? editTemplate : viewTemplate}
    </li>
  );
};

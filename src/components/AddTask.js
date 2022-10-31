/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { FaPlusCircle } from 'react-icons/fa';
import { usePrevious } from '../Hooks';

export const AddTask = (props) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isAddTaskVisible, setAddTaskVisible] = useState(false);
  const wasAddTaskVisible = usePrevious(isAddTaskVisible);
  const [isTaskNameWhiteSpace, setTaskNameWhiteSpace] = useState(true);
  const taskInputRef = useRef(null);

  const handleTaskNameChange = (e) => {
    if (e.nativeEvent.inputType !== 'insertLineBreak')
      setNewTaskName(e.target.value);
  };
  const handleTaskDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };
  const handleCancel = (e) => {
    if (
      e.key === 'Escape' ||
      e.currentTarget.className === 'task__input__buttons__cancel'
    ) {
      setAddTaskVisible(!isAddTaskVisible);
      setNewTaskName('');
      setNewTaskDescription('');
    }
  };
  const handleAddTask = (e) => {
    // Shift + Enter pressed. Add a line break character
    // instead of editing the task.
    if (e.keyCode === 13 && e.shiftKey) {
    } else if (
      (e.key === 'Enter' ||
        e.currentTarget.className ===
          'task__input__buttons__submit task__input__buttons__submit--active') &&
      newTaskName.trim() !== ''
    ) {
      props.addTask(newTaskName.trim(), newTaskDescription.trim());
      setNewTaskName('');
      setNewTaskDescription('');
      setAddTaskVisible(!isAddTaskVisible);
    } else {
      handleCancel(e);
    }
  };

  useEffect(() => {
    setTaskNameWhiteSpace(newTaskName.trim() === '');
    if (!wasAddTaskVisible && isAddTaskVisible) {
      taskInputRef.current.focus();
    }
  });

  return (
    <div className="add-task">
      <div
        className={
          isAddTaskVisible
            ? 'add-task__input'
            : 'add-task__input add-task__input--invisible'
        }
      >
        <TextareaAutosize
          className="add-task__input__task-name-input"
          type="text"
          value={newTaskName}
          onChange={handleTaskNameChange}
          onKeyDown={handleAddTask}
          ref={taskInputRef}
          maxRows={4}
          placeholder="Title"
        />
        <TextareaAutosize
          className="add-task__input__task-description-input"
          type="text"
          value={newTaskDescription}
          onChange={handleTaskDescriptionChange}
          onKeyDown={handleAddTask}
          maxRows={4}
          placeholder="Description"
        />
        <div className="add-task__input__buttons">
          <button
            className="task__input__buttons__cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={
              isTaskNameWhiteSpace
                ? 'task__input__buttons__submit'
                : 'task__input__buttons__submit task__input__buttons__submit--active'
            }
            type="button"
            onClick={handleAddTask}
          >
            Add task
          </button>
        </div>
      </div>
      <div className="add-task__show-input">
        <div
          className={
            isAddTaskVisible
              ? 'add-task__show-wrapper add-task__show-wrapper--invisible'
              : 'add-task__show-wrapper'
          }
          onClick={() => {
            setAddTaskVisible(!isAddTaskVisible);
          }}
          onKeyDown={() => {
            setAddTaskVisible(!isAddTaskVisible);
          }}
          role="button"
          tabIndex={0}
        >
          <button className="add-task__show-add-task" type="button">
            <FaPlusCircle />
          </button>
          <span className="add-task__show-add-task-label">Add task</span>
        </div>
      </div>
    </div>
  );
};

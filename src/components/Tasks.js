/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AddTask } from './AddTask';
import { Task } from './Task';
import { useSelectedProject } from '../context/selected-project-context';
import { useTasks } from '../context/tasks-context';
import { Modal } from './Modal';

export const Tasks = () => {
  const { tasks, setTasks } = useTasks();
  const { selectedProject, setSelectedProject } = useSelectedProject();
  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useState(
    false
  );
  const deleteTaskModalTitle = 'Delete task';
  const [currentTask, setCurrentTask] = useState();

  const addTask = (newTaskName, newTaskDescription) => {
    let projectIdToAdd;
    if (
      selectedProject !== -1 &&
      selectedProject !== -2 &&
      selectedProject !== -3 &&
      selectedProject !== -4
    ) {
      projectIdToAdd = selectedProject;
    }
    const newTask = {
      id: `todo-${nanoid()}`,
      name: newTaskName,
      isCompleted: false,
      dueDate: null,
      isDueDateWithTime: false,
      projectId: projectIdToAdd,
      description: newTaskDescription,
      priority: 5,
    };
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  };
  const toggleTaskCompleted = (id) => {
    const newTaskList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTaskList);
  };
  const editTask = (originalTask, newTaskName, newTaskDescription) => {
    const newTaskList = tasks.map((task) => {
      if (task.id === originalTask.id) {
        return { ...task, name: newTaskName, description: newTaskDescription };
      }
      return task;
    });
    setTasks(newTaskList);
  };
  const updateTask = (pTask) => {
    const newTaskList = tasks.map((task) => {
      if (task.id === pTask.id) {
        return { ...pTask };
      }
      return task;
    });
    setTasks(newTaskList);
  };
  const showDeleteTaskModal = (pTask) => {
    setIsDeleteTaskModalVisible(true);
    setCurrentTask(pTask);
  };

  let filteredTasks;
  // Today
  if (selectedProject === -1) {
    const today = new Date();
    filteredTasks = tasks.filter(
      // eslint-disable-next-line eqeqeq
      (task) => today.toDateString() == new Date(task.dueDate).toDateString()
    );
    // Next 7 days
  } else if (selectedProject === -2) {
    const min = Date.parse(new Date().toDateString());
    // eslint-disable-next-line prefer-const
    let max = new Date();
    max.setDate(max.getDate() + 6);
    max.setHours(23, 59, 59, 999);
    filteredTasks = tasks.filter(
      // eslint-disable-next-line eqeqeq
      (task) => task.dueDate >= min && task.dueDate <= max
    );
    // All
  } else if (selectedProject === -3) {
    filteredTasks = tasks;
    // Completed
  } else if (selectedProject === -4) {
    filteredTasks = tasks.filter((task) => task.isCompleted === true);
    // We have selected project, which is not pre-defined.
  } else {
    filteredTasks = tasks.filter((task) => task.projectId === selectedProject);
  }

  return (
    <div className="tasks">
      <ul className="tasks__list">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
            updateTask={updateTask}
            icon={FaRegCheckCircle}
            showDeleteTaskModal={showDeleteTaskModal}
          />
        ))}
      </ul>
      {isDeleteTaskModalVisible && (
        <Modal
          isModalVisible={isDeleteTaskModalVisible}
          setIsModalVisible={setIsDeleteTaskModalVisible}
          title={deleteTaskModalTitle}
          task={currentTask}
          delete={deleteTask}
        />
      )}
      <AddTask addTask={addTask} />
    </div>
  );
};

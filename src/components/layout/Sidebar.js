/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaInfinity,
  FaCheck,
  FaCircle,
  FaPlus,
} from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { Project } from '../Project';
import { Modal } from '../Modal';
import { useTasks } from '../../context/tasks-context';

const PROJECTS = [
  {
    id: -1,
    name: 'Today',
    icon: FaCalendarDay,
    ariaLabel: "Show today's tasks",
  },
  {
    id: -2,
    name: 'Next 7 days',
    icon: FaCalendarWeek,
    ariaLabel: "Show the next 7 days' tasks",
  },
  {
    id: -3,
    name: 'All',
    icon: FaInfinity,
    ariaLabel: 'Show all of the tasks',
  },
  {
    id: -4,
    name: 'Completed',
    icon: FaCheck,
    ariaLabel: 'Show the completed tasks',
  },
];

const NON_PRE_DEFINED_PROJECTS = [
  {
    id: `project-${nanoid()}`,
    name: 'Project_0001',
    icon: FaCircle,
    ariaLabel: 'Show the tasks related to the "Project_0001" project',
  },
  {
    id: `project-${nanoid()}`,
    name: 'Project_0002',
    icon: FaCircle,
    ariaLabel: 'Show the tasks related to the "Project_0002" project',
  },
  {
    id: `project-${nanoid()}`,
    name: 'Project_0003',
    icon: FaCircle,
    ariaLabel: 'Show the tasks related to the "Project_0003" project',
  },
  {
    id: `project-${nanoid()}`,
    name: 'Project_0004',
    icon: FaCircle,
    ariaLabel: 'Show the tasks related to the "Project_0004" project',
  },
];

export const Sidebar = () => {
  const [projects, setProjects] = useState(PROJECTS);
  const [nonPreDefinedProjects, setNonPreDefinedProjects] = useState(
    NON_PRE_DEFINED_PROJECTS
  );
  const [isAddProjectModalVisible, setIsAddProjectModalVisible] = useState(
    false
  );
  const addProjectModalTitle = 'Add project';
  const { tasks, setTasks } = useTasks();

  const add = (newName) => {
    const newProject = {
      id: `project-${nanoid()}`,
      name: newName,
      icon: FaCircle,
      ariaLabel: '',
    };
    setNonPreDefinedProjects([...nonPreDefinedProjects, newProject]);
  };
  const edit = (originalProject, newProjectName) => {
    const newNonPreDefinedProjectList = nonPreDefinedProjects.map((project) => {
      if (project.id === originalProject.id) {
        return { ...project, name: newProjectName };
      }
      return project;
    });
    setNonPreDefinedProjects(newNonPreDefinedProjectList);
  };
  const deleteProject = (id) => {
    const newNonPreDefinedProjects = nonPreDefinedProjects.filter(
      (project) => project.id !== id
    );
    setNonPreDefinedProjects(newNonPreDefinedProjects);
    // Delete the tasks belonging to the Project.
    const newTaskList = tasks.filter((task) => task.projectId !== id);
    setTasks(newTaskList);
  };

  return (
    <div className="sidebar">
      <ul className="sidebar__pre-defined-projects">
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </ul>
      <div className="sidebar__non-pre-defined-projects-header">
        <div className="sidebar__non-pre-defined-projects-header-icon">
          <FaCircle />
        </div>
        <div className="sidebar__non-pre-defined-projects-header-name">
          Projects
        </div>
        <button
          className="sidebar__non-pre-defined-projects-header-button"
          type="button"
          onClick={() => setIsAddProjectModalVisible(true)}
        >
          <FaPlus />
        </button>
      </div>
      <ul className="sidebar__non-pre-defined-projects">
        {nonPreDefinedProjects.map((project) => (
          <Project
            key={project.id}
            project={project}
            edit={edit}
            delete={deleteProject}
          />
        ))}
      </ul>
      {isAddProjectModalVisible && (
        <Modal
          isModalVisible={isAddProjectModalVisible}
          setIsModalVisible={setIsAddProjectModalVisible}
          title={addProjectModalTitle}
          add={add}
        />
      )}
    </div>
  );
};

/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { useSelectedProject } from '../context/selected-project-context';
import { ProjectPopoverMenu } from './ProjectPopoverMenu';

export const Project = (props) => {
  const [project, setProject] = useState(props.project);
  const { selectedProject, setSelectedProject } = useSelectedProject();
  const [haveMouseEntered, setMouseEntered] = useState(false);
  const isPredefinedProject =
    project.id === -1 ||
    project.id === -2 ||
    project.id === -3 ||
    project.id === -4;

  return (
    <li
      className={selectedProject === project.id ? 'selected' : undefined}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    >
      <div
        className={
          selectedProject === project.id
            ? 'sidebar__pre-defined-projects-item--selected sidebar__pre-defined-projects-item'
            : 'sidebar__pre-defined-projects-item'
        }
        aria-label={project.ariaLabel}
        onClick={() => {
          setSelectedProject(project.id);
        }}
        onKeyDown={() => {
          setSelectedProject(project.id);
        }}
        tabIndex={0}
        role="button"
      >
        <div className="sidebar__pre-defined-projects-item-icon">
          <project.icon />
        </div>
        <div className="sidebar__pre-defined-projects-item-name">
          {project.name}
        </div>
        {!isPredefinedProject && (
          <ProjectPopoverMenu
            haveMouseEntered={haveMouseEntered}
            setMouseEntered={setMouseEntered}
            project={project}
            edit={props.edit}
            delete={props.delete}
          />
        )}
      </div>
    </li>
  );
};

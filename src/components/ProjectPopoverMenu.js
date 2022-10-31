/* eslint-disable no-debugger */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { FaEllipsisH, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { Modal } from './Modal';

export const ProjectPopoverMenu = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditProjectModalVisible, setIsEditProjectModalVisible] = useState(
    false
  );
  const editProjectModalTitle = 'Edit project';
  const [
    isDeleteProjectModalVisible,
    setIsDeleteProjectModalVisible,
  ] = useState(false);
  const deleteProjectModalTitle = 'Delete project';

  const handlePopoverOpen = (e) => {
    let onPopoverClick = false;
    const path = e.composedPath();
    try {
      let index;
      let value;
      let result;
      // eslint-disable-next-line no-plusplus
      for (index = 0; index < path.length; ++index) {
        value = path[index].className;
        if (
          value.includes('rc-time-picker-panel') ||
          value.includes('react-tiny-popover-container')
        ) {
          // You've found it, the full text is in `value`.
          // So you might grab it and break the loop, although
          // really what you do having found it depends on
          // what you need.
          result = value;
          onPopoverClick = true;
          break;
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setIsPopoverOpen(onPopoverClick);
  };
  const handlePopoverOpenAndInit = (e) => {
    if (
      e.currentTarget.className.includes(
        'sidebar__pre-defined-projects-item-button'
      ) &&
      e.key !== 'Enter' &&
      e.key !== 'Escape'
    ) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  };
  const showEditProjectModal = () => {
    setIsEditProjectModalVisible(true);
    setIsPopoverOpen(false);
  };
  const showDeleteProjectModal = () => {
    setIsDeleteProjectModalVisible(true);
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom', 'top', 'left', 'right']}
      onClickOutside={handlePopoverOpen}
      content={
        <div className="project-popover-menu">
          <div
            className="project-popover-menu__item"
            onClick={showEditProjectModal}
            onKeyDown={showEditProjectModal}
            role="button"
            tabIndex={0}
          >
            <div className="project-popover-menu__item-icon">
              <FaPencilAlt />
            </div>
            <div className="project-popover-menu__item-title">Edit project</div>
          </div>
          <div
            className="project-popover-menu__item"
            onClick={showDeleteProjectModal}
            onKeyDown={showDeleteProjectModal}
            role="button"
            tabIndex={0}
          >
            <div className="project-popover-menu__item-icon">
              <FaRegTrashAlt />
            </div>
            <div className="project-popover-menu__item-title">
              Delete project
            </div>
          </div>
        </div>
      }
    >
      <button
        className={
          isPopoverOpen
            ? 'sidebar__pre-defined-projects-item-button sidebar__pre-defined-projects-item-button--popover-open'
            : props.haveMouseEntered
            ? 'sidebar__pre-defined-projects-item-button'
            : 'sidebar__pre-defined-projects-item-button sidebar__pre-defined-projects-item-button--hidden'
        }
        type="button"
        onClick={handlePopoverOpenAndInit}
        onKeyDown={handlePopoverOpenAndInit}
      >
        <FaEllipsisH />
        {isEditProjectModalVisible && (
          <Modal
            isModalVisible={isEditProjectModalVisible}
            setIsModalVisible={setIsEditProjectModalVisible}
            title={editProjectModalTitle}
            project={props.project}
            edit={props.edit}
            setIsPopoverOpen={setIsPopoverOpen}
            setMouseEntered={props.setMouseEntered}
          />
        )}
        {isDeleteProjectModalVisible && (
          <Modal
            isModalVisible={isDeleteProjectModalVisible}
            setIsModalVisible={setIsDeleteProjectModalVisible}
            title={deleteProjectModalTitle}
            project={props.project}
            delete={props.delete}
            setIsPopoverOpen={setIsPopoverOpen}
            setMouseEntered={props.setMouseEntered}
          />
        )}
      </button>
    </Popover>
  );
};

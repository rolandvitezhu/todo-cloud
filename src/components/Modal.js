/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useRef, useState } from 'react';
import { usePrevious } from '../Hooks';

export const Modal = (props) => {
  const [title, setTitle] = useState(props.title);
  const [newName, setNewName] = useState(
    props.project && props.project.name
      ? props.project.name
      : props.task && props.task.name
      ? props.task.name
      : ''
  );
  const wasVisible = usePrevious(props.isModalVisible);
  const [isNameWhiteSpace, setNameWhiteSpace] = useState(true);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [project, setProject] = useState(props.project);
  const [task, setTask] = useState(props.task);
  const [isDelete, setIsDelete] = useState(!!props.delete);

  const closeModal = () => {
    props.setIsModalVisible(false);
    if (props.setMouseEntered) {
      props.setMouseEntered(false);
    }
    setNewName('');
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleEdit = (e) => {
    if (
      (e.key === 'Enter' ||
        e.currentTarget.className ===
          'modal__footer__buttons__submit modal__footer__buttons__submit--active') &&
      newName.trim() !== ''
    ) {
      if (project) {
        props.edit(props.project, newName.trim());
        project.name = newName.trim();
        setProject(project);
        closeModal();
      }
    } else if (
      e.key === 'Escape' ||
      e.currentTarget.className === 'modal__footer__buttons__cancel'
    ) {
      closeModal();
    }
  };
  const handleCancel = (e) => {
    if (
      e.key === 'Escape' ||
      e.currentTarget.className === 'modal__footer__buttons__cancel'
    ) {
      closeModal();
    }
  };
  const handleAdd = (e) => {
    if (
      (e.key === 'Enter' ||
        e.currentTarget.className ===
          'modal__footer__buttons__submit modal__footer__buttons__submit--active') &&
      newName.trim() !== ''
    ) {
      props.add(newName.trim());
      closeModal();
    } else {
      handleCancel(e);
    }
  };
  const handleDelete = (e) => {
    if (props.delete && project) {
      props.delete(project.id);
    }
    if (props.delete && task) {
      props.delete(task.id);
    }
    closeModal();
  };
  const handleOutsideClick = (e) => {
    if (
      modalRef &&
      modalRef.current &&
      modalRef.current.contains &&
      !modalRef.current.contains(e.target)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    setNameWhiteSpace(newName.trim() === '');
    if (!wasVisible && props.isModalVisible && inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener('keyup', handleCancel, false);
    document.addEventListener('mouseup', handleOutsideClick);
    return () => {
      document.removeEventListener('keyup', handleCancel, false);
      document.removeEventListener('mouseup', handleOutsideClick);
    };
  });

  return (
    <div className="modal__background">
      <div className="modal__content" ref={modalRef}>
        <div className="modal__header">
          <div className="modal__header__title">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="modal__body">
          {!isDelete && (
            <div className="modal__body__name">
              <label
                className="modal__body__name__label"
                htmlFor="modal__body__name__input"
              >
                Name
              </label>
              <input
                className="modal__body__name__input"
                id="modal__body__name__input"
                value={newName}
                onChange={handleNameChange}
                onKeyDown={props.edit ? handleEdit : handleAdd}
                ref={inputRef}
                type="text"
              />
            </div>
          )}
          {isDelete && (
            <div className="modal__body__message">
              <span>
                Are you sure you want to delete{' '}
                <span className="bold">{newName}</span>?
              </span>
            </div>
          )}
        </div>
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            <button
              className="modal__footer__buttons__cancel"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={
                isNameWhiteSpace
                  ? 'modal__footer__buttons__submit'
                  : 'modal__footer__buttons__submit modal__footer__buttons__submit--active'
              }
              type="button"
              onClick={
                props.delete
                  ? handleDelete
                  : props.edit
                  ? handleEdit
                  : handleAdd
              }
            >
              {props.delete ? 'Delete' : props.edit ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

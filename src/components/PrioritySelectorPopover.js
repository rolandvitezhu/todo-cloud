/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { FaCheck, FaFlag, FaRegFlag } from 'react-icons/fa';
import { Popover } from 'react-tiny-popover';

export const PrioritySelectorPopover = (props) => {
  const task = props.task;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [priority, setPriority] = useState(task.priority);

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
  const handlePopoverOpenAndInit = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  const handlePriorityChange = (pPriority) => {
    setPriority(pPriority);
    task.priority = pPriority;
    props.handleTaskUpdate(task);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom', 'top', 'left', 'right']}
      onClickOutside={handlePopoverOpen}
      content={
        <div className="priority-selector-popover">
          <div className="priority-selector-popover__priority-item-list">
            <div
              className="priority-selector-popover__priority-item"
              onClick={() => handlePriorityChange(1)}
              onKeyDown={() => handlePriorityChange(1)}
              role="button"
              tabIndex={0}
            >
              <div className="priority-selector-popover__priority-item-icon svg-red">
                <FaFlag />
              </div>
              <div className="priority-selector-popover__priority-item-name">
                Priority 1
              </div>
              <div
                className={
                  priority === 1
                    ? 'priority-selector-popover-priority-item-checkmark'
                    : 'priority-selector-popover-priority-item-checkmark invisible'
                }
              >
                <FaCheck />
              </div>
            </div>
            <div
              className="priority-selector-popover__priority-item"
              onClick={() => handlePriorityChange(2)}
              onKeyDown={() => handlePriorityChange(2)}
              role="button"
              tabIndex={0}
            >
              <div className="priority-selector-popover__priority-item-icon svg-orange">
                <FaFlag />
              </div>
              <div className="priority-selector-popover__priority-item-name">
                Priority 2
              </div>
              <div
                className={
                  priority === 2
                    ? 'priority-selector-popover-priority-item-checkmark'
                    : 'priority-selector-popover-priority-item-checkmark invisible'
                }
              >
                <FaCheck />
              </div>
            </div>
            <div
              className="priority-selector-popover__priority-item"
              onClick={() => handlePriorityChange(3)}
              onKeyDown={() => handlePriorityChange(3)}
              role="button"
              tabIndex={0}
            >
              <div className="priority-selector-popover__priority-item-icon svg-green">
                <FaFlag />
              </div>
              <div className="priority-selector-popover__priority-item-name">
                Priority 3
              </div>
              <div
                className={
                  priority === 3
                    ? 'priority-selector-popover-priority-item-checkmark'
                    : 'priority-selector-popover-priority-item-checkmark invisible'
                }
              >
                <FaCheck />
              </div>
            </div>
            <div
              className="priority-selector-popover__priority-item"
              onClick={() => handlePriorityChange(4)}
              onKeyDown={() => handlePriorityChange(4)}
              role="button"
              tabIndex={0}
            >
              <div className="priority-selector-popover__priority-item-icon  svg-blue">
                <FaFlag />
              </div>
              <div className="priority-selector-popover__priority-item-name">
                Priority 4
              </div>
              <div
                className={
                  priority === 4
                    ? 'priority-selector-popover-priority-item-checkmark'
                    : 'priority-selector-popover-priority-item-checkmark invisible'
                }
              >
                <FaCheck />
              </div>
            </div>
            <div
              className="priority-selector-popover__priority-item"
              onClick={() => handlePriorityChange(5)}
              onKeyDown={() => handlePriorityChange(5)}
              role="button"
              tabIndex={0}
            >
              <div className="priority-selector-popover__priority-item-icon svg-grey">
                <FaRegFlag />
              </div>
              <div className="priority-selector-popover__priority-item-name">
                Priority 5
              </div>
              <div
                className={
                  priority === 5
                    ? 'priority-selector-popover-priority-item-checkmark'
                    : 'priority-selector-popover-priority-item-checkmark invisible'
                }
              >
                <FaCheck />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <button
        className="task__edit-template-priority"
        onClick={handlePopoverOpenAndInit}
        onKeyDown={handlePopoverOpenAndInit}
        type="button"
        tabIndex={0}
      >
        <FaRegFlag />
      </button>
    </Popover>
  );
};

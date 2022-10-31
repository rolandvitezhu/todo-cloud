/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { Popover } from 'react-tiny-popover';
import {
  FaCalendarDay,
  FaCalendarTimes,
  FaCalendarWeek,
  FaRegCalendarAlt,
  FaSun,
} from 'react-icons/fa';

export const DateTimePicker = (props) => {
  const task = props.task;
  const [isOverDue, setOverDue] = useState(false);
  const [startDate, setStartDate] = useState(
    task.dueDate !== null ? new Date(task.dueDate) : new Date()
  );
  const format = 'hh:mmA';
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const getFormattedDueDate = () => {
    Moment.locale('en');
    let dateFormatString = '';
    let dateString = '';
    const currentDueDate = Moment(task.dueDate);
    const yesterday = Moment().subtract(1, 'days');
    const isToday = currentDueDate.isSame(Moment(), 'date');
    const tomorrow = Moment().add(1, 'days');
    const isTomorrow = currentDueDate.isSame(tomorrow, 'date');
    const isYesterday = currentDueDate.isSame(yesterday, 'date');
    if (isYesterday) {
      dateString = 'Yesterday';
    } else if (isToday) {
      dateString = 'Today';
    } else if (isTomorrow) {
      dateString = 'Tomorrow';
    } else {
      dateFormatString = 'ddd, MMM DD';
      if (Moment(task.dueDate).year() !== Moment().year())
        /* Not this year. */
        dateFormatString += ' YYYY';
    }
    if (task.isDueDateWithTime)
      /* Is time set. */
      dateFormatString += ' hh:mmA';
    if (dateFormatString !== '')
      dateString += Moment(task.dueDate).format(dateFormatString);
    return dateString;
  };
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
    setStartDate(task.dueDate !== null ? new Date(task.dueDate) : new Date());
  };
  const handleDueDateChange = (date) => {
    // Use a Date object as a parameter, not a Moment.
    if (startDate !== null && date !== null && date instanceof Date) {
      const hours = startDate.getHours();
      const minutes = startDate.getUTCMinutes();
      date.setHours(hours, minutes, 0, 0);
    }
    if (date === null) {
      task.isDueDateWithTime = false;
    }
    setStartDate(date);
    task.dueDate = date;
    props.handleTaskUpdate(task);
  };
  const handleDueDateTimeChange = (date) => {
    if (date !== null && date._d !== null) {
      const hours = date._d.getHours();
      const minutes = date._d.getUTCMinutes();
      let newStartDate = null;
      if (startDate === null) {
        newStartDate = new Date();
      } else {
        newStartDate = startDate;
      }
      const dateTime = Moment(newStartDate);
      dateTime._d.setHours(hours);
      dateTime._d.setUTCMinutes(minutes);
      task.dueDate = dateTime._d.getTime();
      setStartDate(new Date(task.dueDate));
      task.isDueDateWithTime = true;
    } else {
      task.isDueDateWithTime = false;
    }
    props.handleTaskUpdate(task);
  };
  const tomorrow = () => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };
  const getNextWeekDateTime = () => {
    const dayINeed = 1; // Monday
    const today = Moment().isoWeekday();
    // If we have not passed the day of the week that I need yet.
    if (today < dayINeed) {
      // Give me this week's instance of that day.
      return Moment().isoWeekday(dayINeed);
    }
    // Give me next week's instance of that same day.
    return Moment().add(1, 'weeks').isoWeekday(dayINeed);
  };

  useEffect(() => {
    if (Moment(task.dueDate) < Moment()) setOverDue(true);
    else setOverDue(false);
  });

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
      onClickOutside={handlePopoverOpen}
      content={
        <div className="date-time-picker">
          <div className="date-time-picker__quick-date-selector-wrapper">
            <div
              className="date-time-picker__quick-date-selector-item"
              onClick={() => handleDueDateChange(new Date())}
              onKeyDown={() => handleDueDateChange(new Date())}
              role="button"
              tabIndex={0}
            >
              <div className="date-time-picker__quick-date-selector-item-icon">
                <FaCalendarDay />
              </div>
              <div className="date-time-picker__quick-date-selector-item-title">
                Today
              </div>
              <div className="date-time-picker__quick-date-selector-item-date-time">
                {Moment().format('ddd')}
              </div>
            </div>
            <div
              className="date-time-picker__quick-date-selector-item"
              onClick={() => handleDueDateChange(tomorrow())}
              onKeyDown={() => handleDueDateChange(tomorrow())}
              role="button"
              tabIndex={0}
            >
              <div className="date-time-picker__quick-date-selector-item-icon">
                <FaSun />
              </div>
              <div className="date-time-picker__quick-date-selector-item-title">
                Tomorrow
              </div>
              <div className="date-time-picker__quick-date-selector-item-date-time">
                {Moment().add(1, 'days').format('ddd')}
              </div>
            </div>
            <div
              className="date-time-picker__quick-date-selector-item"
              onClick={() =>
                handleDueDateChange(getNextWeekDateTime().toDate())
              }
              onKeyDown={() =>
                handleDueDateChange(getNextWeekDateTime().toDate())
              }
              role="button"
              tabIndex={0}
            >
              <div className="date-time-picker__quick-date-selector-item-icon">
                <FaCalendarWeek />
              </div>
              <div className="date-time-picker__quick-date-selector-item-title">
                Next week
              </div>
              <div className="date-time-picker__quick-date-selector-item-date-time">
                {getNextWeekDateTime().format('ddd MMM DD')}
              </div>
            </div>
            <div
              className={
                task.dueDate === null
                  ? 'date-time-picker__quick-date-selector-item--hidden'
                  : 'date-time-picker__quick-date-selector-item'
              }
              onClick={() => handleDueDateChange(null)}
              onKeyDown={() => handleDueDateChange(null)}
              role="button"
              tabIndex={0}
            >
              <div className="date-time-picker__quick-date-selector-item-icon">
                <FaCalendarTimes />
              </div>
              <div className="date-time-picker__quick-date-selector-item-title">
                No Date
              </div>
              <div className="date-time-picker__quick-date-selector-item-date-time" />
            </div>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDueDateChange(date)}
            inline
            disabledKeyboardNavigation
            calendarStartDay={1}
          />
          <div className="date-time-picker__time-picker-wrapper">
            <TimePicker
              className="date-time-picker__time-picker"
              popupClassName="date-time-picker__time-picker-popup"
              showSecond={false}
              value={task.isDueDateWithTime ? Moment(startDate) : null}
              onChange={handleDueDateTimeChange}
              format={format}
              use12Hours
              inputReadOnly
              placeholder="Time"
            />
          </div>
        </div>
      }
    >
      <div
        className={
          // eslint-disable-next-line no-nested-ternary
          task.dueDate !== null
            ? !isOverDue
              ? 'task__view-template-due-date'
              : 'task__view-template-due-date task__view-template-due-date--overdue'
            : 'task__view-template-due-date task__view-template-due-date--hidden'
        }
        onClick={handlePopoverOpenAndInit}
        onKeyDown={handlePopoverOpenAndInit}
        role="button"
        tabIndex={0}
      >
        <FaRegCalendarAlt /> {getFormattedDueDate()}
      </div>
    </Popover>
  );
};

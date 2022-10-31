/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { SelectedProjectProvider } from './context/selected-project-context';
import { TasksProvider } from './context/tasks-context';
// import logo from './logo.svg';
// import './App.css';

export const App = () => {
  return (
    <div className="app">
      <SelectedProjectProvider>
        <TasksProvider>
          <Header />
          <Content />
        </TasksProvider>
      </SelectedProjectProvider>
    </div>
  );
};

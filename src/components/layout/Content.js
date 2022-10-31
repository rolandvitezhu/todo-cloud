/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Tasks } from '../Tasks';
import { Sidebar } from './Sidebar';

export const Content = () => {
  return (
    <div className="content">
      <Sidebar />
      <Tasks />
    </div>
  );
};

import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectContext = createContext();
// eslint-disable-next-line react/prop-types
export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(-1);

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProject = () => useContext(SelectedProjectContext);
// Originally "useSelectedProjectValue".

"use client";

import { useGetWorkSpaces } from "@/lib/queries";
import React, { createContext, ReactNode, useContext } from "react";

const WorkSpacesContext = createContext<
  ReturnType<typeof useGetWorkSpaces> | undefined
>(undefined);

export const WorkSpacesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const workSpacesQuery = useGetWorkSpaces();

  return (
    <WorkSpacesContext.Provider value={workSpacesQuery}>
      {children}
    </WorkSpacesContext.Provider>
  );
};

export const useWorkSpaces = () => {
  const context = useContext(WorkSpacesContext);
  if (!context)
    throw new Error("useWorkSpaces must be used within a WorkSpacesProvider");
  return context;
};

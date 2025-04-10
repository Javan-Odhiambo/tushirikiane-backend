"use client";

import { useGetBoards } from "@/lib/queries/boards";
import { useParams } from "next/navigation";
import React, { createContext, ReactNode, useContext } from "react";

const BoardsContext = createContext<
  ReturnType<typeof useGetBoards> | undefined
>(undefined);

export const BoardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const boardsQuery = useGetBoards(workSpacesSlug);

  return (
    <BoardsContext.Provider value={boardsQuery}>
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoards = () => {
  const context = useContext(BoardsContext);
  if (!context)
    throw new Error("useBoards must be used within a BoardsProvider");
  return context;
};

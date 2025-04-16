"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ViewType = "board" | "table";

interface ListsViewContextType {
  listsView: ViewType;
  setListsView: (view: ViewType) => void;
  isBoardView: boolean;
  isTableView: boolean;
}

const LOCAL_STORAGE_KEY = "listsView";

const ListsViewContext = createContext<ListsViewContextType | undefined>(
  undefined
);

export const ListsViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [listsView, setListsViewState] = useState<ViewType>("board");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored === "board" || stored === "table") {
      setListsViewState(stored);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, "board");
    }
  }, []);

  const setListsView = (view: ViewType) => {
    setListsViewState(view);
    localStorage.setItem(LOCAL_STORAGE_KEY, view);
  };

  return (
    <ListsViewContext.Provider
      value={{
        listsView,
        setListsView,
        isBoardView: listsView === "board",
        isTableView: listsView === "table",
      }}
    >
      {children}
    </ListsViewContext.Provider>
  );
};

export const useListsView = (): ListsViewContextType => {
  const context = useContext(ListsViewContext);
  if (!context) {
    throw new Error("useListsView must be used within a ListsViewProvider");
  }
  return context;
};

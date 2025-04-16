"use client";

import { useListsView } from "@/providers/ListsViewProvider";
import ListsContainer from "../lists/ListsContainer";
import ListsTable from "../lists/ListsTable";
import SecondaryHeader from "./SecondaryHeader";

const BoardsWrapper = () => {
  const { listsView } = useListsView();

  return (
    <>
      <SecondaryHeader />
      {listsView === "board" ? <ListsContainer /> : <ListsTable />}
    </>
  );
};

export default BoardsWrapper;

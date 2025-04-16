import BoardsWrapper from "@/components/boards/BoardsWrapper";
import { ListsViewProvider } from "@/providers/ListsViewProvider";

const BoardsSlugPage = () => {
  return (
    <ListsViewProvider>
      <BoardsWrapper />
    </ListsViewProvider>
  );
};

export default BoardsSlugPage;

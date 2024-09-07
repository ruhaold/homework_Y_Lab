import { useQuery } from "@tanstack/react-query";
import { fetchNotesList } from "../../api/Note";
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { queryClient } from "../../api/queryClient";

export const FetchNotesListView = () => {
  const notesListQuery = useQuery(
    {
      queryFn: () => fetchNotesList(),
      queryKey: ["notes"],
    },
    queryClient
  );

  switch (notesListQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <NotesListView notesList={notesListQuery.data.list} />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка: </span>
          <button onClick={() => notesListQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
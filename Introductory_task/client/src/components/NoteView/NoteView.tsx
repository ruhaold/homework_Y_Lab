import "./NoteView.css";
import { FC } from "react";
import { Note } from "../../api/Note";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface NoteViewProps {
  note: Note;
}

export const NoteView: FC<NoteViewProps> = ({ note }) => {
  return (
    <div className={"note-view"}>
      <div className={"note-view__head"}>
        <p className={"note-view__datetime"}>{formatDate(note.createdAt)}</p>
        <p className={"note-view__title"}>{note.title}</p>
      </div>

      <p className={"note-view__text"}>{note.text}</p>
    </div>
  );
};
